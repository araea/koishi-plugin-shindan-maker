import { Context, h, Logger, Schema, Session, sleep } from "koishi";
import {} from "koishi-plugin-puppeteer";

import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import crypto from "crypto";
import * as cheerio from "cheerio";
import * as https from "https";
import { URL, URLSearchParams } from "url";
import { pathToFileURL } from "url";

// ========================================================================
// [Metadata] Crate Metadata
// ========================================================================
export const name = "shindan-maker";
export const inject = {
  required: ["database"],
  optional: ["puppeteer"],
};
export const usage = `## 使用

1. 安装 \`puppeteer\` 服务（可选，文本模式不依赖）。
2. 设置指令别名。
3. 发送 \`shindan.列表\` 查看神断指令列表。
4. 发送神断指令，如 \`抽老婆\`，即可生成对应的神断结果。
5. 参数 \`-t\` 或 \`-i\` 指定生成的神断结果是文本模式还是图片模式。

## QQ 群

* 956758505`;

const logger = new Logger("shindan_maker");

// ========================================================================
// [Constants & Types]
// ========================================================================
const SHINDAN_MODES = ["image", "text"] as const;
type MakeShindanMode = typeof SHINDAN_MODES[number];

const isShindanMode = (s: string): s is MakeShindanMode =>
  (SHINDAN_MODES as readonly string[]).includes(s);

const SHINDAN_ID_REGEX = /^\d+$/;
const FLAG_REGEX_GLOBAL = /(^|\s)(-[ti])(?=\s|$)/g;
const HTTP_REDIRECT_CODES = new Set([301, 302, 303, 307, 308]);

interface ShindanDefinition {
  shindanId: string;
  shindanCommand: string;
  shindanMode: MakeShindanMode;
  shindanTitle: string;
}

declare module "koishi" {
  interface Tables {
    shindan_rank: ShindanRank;
  }
}

interface ShindanRank {
  id: number;
  userId: string;
  username: string;
  shindanCount: number;
}

// ========================================================================
// [Config] Configuration Schema
// ========================================================================
export interface Config {
  shindanUrl: string;
  commandPrefix: string;
  maxRetryCount: number;
  defaultMaxDisplayCount: number;
  retractDelay: number;
  imageType: "png" | "jpeg" | "webp";
  isRandomDivineCommandVisible: boolean;
  isOfficialShindanSyncEnabled: boolean;
  itemsPerPage: number;
  adminAuthority: number;
  cooldown: number;
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    isOfficialShindanSyncEnabled: Schema.boolean().default(true).description("启动时同步内置预设"),
    commandPrefix: Schema.string().default("").description("神断指令前缀。留空则尝试使用全局配置，若全局配置也为空则保持原样（无需前缀）。"),
    shindanUrl: Schema.union([
      Schema.const("https://shindanmaker.com/").description("日语 (JP)"),
      Schema.const("https://en.shindanmaker.com/").description("英语 (EN)"),
      Schema.const("https://cn.shindanmaker.com/").description("中文 (CN)"),
      Schema.const("https://kr.shindanmaker.com/").description("韩语 (KR)"),
      Schema.const("https://th.shindanmaker.com/").description("泰语 (TH)"),
    ]).default("https://cn.shindanmaker.com/").description("ShindanMaker 主站 URL"),
    maxRetryCount: Schema.number().min(1).default(3).description("最大网络重试次数"),
    cooldown: Schema.number().min(0).default(0).description("用户级冷却时间（秒），0 关闭"),
  }).description("通用配置"),

  Schema.object({
    imageType: Schema.union(["png", "jpeg", "webp"]).default("png").description("输出图片格式"),
    retractDelay: Schema.number().min(0).default(0).description("自动撤回时间（秒），0 为关闭"),
  }).description("消息设置"),

  Schema.object({
    itemsPerPage: Schema.number().min(10).max(200).default(60).description("列表指令每页显示的数量"),
  }).description("列表配置"),

  Schema.object({
    isRandomDivineCommandVisible: Schema.boolean().default(true).description("随机神断时是否展示指令名"),
    defaultMaxDisplayCount: Schema.number().min(1).default(10).description("排行榜显示最大条数"),
    adminAuthority: Schema.number().min(0).max(5).default(3).description("管理类指令所需权限等级"),
  }).description("交互配置"),
]);

// ========================================================================
// [Utils] Utility Functions
// ========================================================================
const Utils = {
  BROWSER_CIPHERS: [
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
    "ECDHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-AES256-GCM-SHA384",
  ].join(":"),

  randomUserAgent(): string {
    const version = () => {
      const buffer = crypto.randomBytes(2);
      const number = buffer.readUInt16BE();
      return `${number >> 8}.${number & 0xff}.0.0`;
    };
    return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version()} Safari/537.36 Edg/${version()}`;
  },

  generateHeaders(): Record<string, string> {
    return { "User-Agent": this.randomUserAgent() };
  },

  async retry<T>(func: () => Promise<T>, maxRetryCount: number, delay = 500): Promise<T> {
    let lastError: Error | undefined;
    for (let i = 0; i < maxRetryCount; i++) {
      try {
        return await func();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (i < maxRetryCount - 1) {
          await sleep(delay * 2 ** i);
        }
      }
    }
    throw lastError ?? new Error("Retry failed");
  },

  isShindanId(s: string): boolean {
    return SHINDAN_ID_REGEX.test(s);
  },

  escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#39;",
    }[c]!));
  },
};

// ========================================================================
// [Service] Network Layer
// ========================================================================
class NetworkService {
  static async request(
    urlStr: string,
    options: https.RequestOptions = {},
    postData?: string,
    maxRedirects = 5,
  ): Promise<{ data: string; headers: Record<string, any> }> {
    const url = new URL(urlStr);
    const requestOptions: https.RequestOptions = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: postData ? "POST" : "GET",
      headers: options.headers || {},
      ciphers: Utils.BROWSER_CIPHERS,
      ...options,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        const status = res.statusCode ?? 0;

        // 重定向
        if (HTTP_REDIRECT_CODES.has(status) && res.headers.location) {
          res.resume(); // 释放数据流，避免内存泄漏
          if (maxRedirects === 0) {
            return reject(new Error("Too many redirects"));
          }
          let redirectUrl: URL;
          try {
            redirectUrl = new URL(res.headers.location, url);
          } catch (e) {
            return reject(e);
          }
          // 301/302/303 通常应转为 GET
          const shouldDropBody = status === 301 || status === 302 || status === 303;
          const nextPostData = shouldDropBody ? undefined : postData;
          const nextOptions: https.RequestOptions = shouldDropBody
            ? { ...options, method: "GET" }
            : options;

          NetworkService.request(redirectUrl.toString(), nextOptions, nextPostData, maxRedirects - 1)
            .then(resolve, reject);
          return;
        }

        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (status >= 200 && status < 400) {
            resolve({ data: body, headers: res.headers });
          } else {
            reject(new Error(`Request failed with status code: ${status}`));
          }
        });
        res.on("error", reject);
      });
      req.on("error", reject);
      if (postData) req.write(postData);
      req.end();
    });
  }

  static async getShindanTitle(prefix: string, id: string): Promise<string> {
    const url = `${prefix}${id}`;
    const { data } = await Utils.retry(
      () => this.request(url, { headers: Utils.generateHeaders() }),
      3,
    );
    const $ = cheerio.load(data);
    const title =
      $("#shindanTitle").attr("data-shindan_title") ||
      $(".shindanTitleLink").text().trim();
    if (!title) throw new Error("Shindan title element not found");
    return title;
  }
}

// ========================================================================
// [Service] Data Repository
// ========================================================================
class ShindanRepository {
  private _shindans: ShindanDefinition[] = [];
  /** 按指令名长度倒序排列，用于中间件匹配（防止短指令吃掉长指令） */
  private _matchOrder: ShindanDefinition[] = [];
  private _commandIndex = new Map<string, ShindanDefinition>();
  private readonly shindansFilePath: string;
  private readonly assetPath: string;

  constructor(private ctx: Context, private config: Config) {
    this.assetPath = path.join(__dirname, "assets", "shindans.json");
    const dataDir = path.join(ctx.baseDir, "data", "shindanMaker");
    this.shindansFilePath = path.join(dataDir, "shindans.json");

    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  }

  /** 用于展示（字典序） */
  get shindans(): readonly ShindanDefinition[] {
    return this._shindans;
  }

  /** 用于匹配（长度倒序） */
  get matchOrder(): readonly ShindanDefinition[] {
    return this._matchOrder;
  }

  async init(): Promise<void> {
    if (!existsSync(this.shindansFilePath)) {
      await fs.writeFile(this.shindansFilePath, "[]", "utf-8");
    }
    if (this.config.isOfficialShindanSyncEnabled) {
      await this.syncOfficialShindans();
    }
    this._shindans = await this.readJSONFile(this.shindansFilePath);
    this.rebuildIndex();
  }

  private async readJSONFile(filePath: string): Promise<ShindanDefinition[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private async syncOfficialShindans(): Promise<void> {
    if (!existsSync(this.assetPath)) return;
    const builtIn = await this.readJSONFile(this.assetPath);
    const current = await this.readJSONFile(this.shindansFilePath);
    const existingIds = new Set(current.map((c) => c.shindanId));
    const newItems = builtIn.filter((b) => !existingIds.has(b.shindanId));

    if (newItems.length > 0) {
      const merged = [...current, ...newItems];
      await fs.writeFile(this.shindansFilePath, JSON.stringify(merged, null, 2), "utf-8");
      logger.info(`Synced ${newItems.length} new shindan definitions.`);
    }
  }

  private rebuildIndex(): void {
    this._shindans.sort((a, b) => a.shindanCommand.localeCompare(b.shindanCommand));
    this._matchOrder = [...this._shindans].sort(
      (a, b) => b.shindanCommand.length - a.shindanCommand.length,
    );
    this._commandIndex.clear();
    for (const s of this._shindans) {
      this._commandIndex.set(s.shindanCommand, s);
    }
  }

  private async persist(): Promise<void> {
    await fs.writeFile(
      this.shindansFilePath,
      JSON.stringify(this._shindans, null, 2),
      "utf-8",
    );
    this.rebuildIndex();
  }

  find(command: string): ShindanDefinition | undefined {
    return this._commandIndex.get(command);
  }

  async add(item: ShindanDefinition): Promise<void> {
    this._shindans.push(item);
    await this.persist();
  }

  async remove(command: string): Promise<boolean> {
    const index = this._shindans.findIndex((s) => s.shindanCommand === command);
    if (index === -1) return false;
    this._shindans.splice(index, 1);
    await this.persist();
    return true;
  }

  async updateMode(command: string, mode: MakeShindanMode): Promise<boolean> {
    const item = this.find(command);
    if (!item) return false;
    item.shindanMode = mode;
    await this.persist();
    return true;
  }

  async updateCommandName(
    oldCommand: string,
    newCommand: string,
  ): Promise<{ success: boolean; error?: string }> {
    const item = this.find(oldCommand);
    if (!item) return { success: false, error: "指令不存在" };
    if (this.find(newCommand)) return { success: false, error: "目标指令名已被占用" };
    item.shindanCommand = newCommand;
    await this.persist();
    return { success: true };
  }
}

// ========================================================================
// [Service] User & Rank Logic
// ========================================================================
class UserService {
  constructor(private ctx: Context) {}

  async ensureUser(userId: string, username: string): Promise<ShindanRank> {
    const [exists] = await this.ctx.database.get("shindan_rank", { userId });
    if (exists) return exists;
    return this.ctx.database.create("shindan_rank", {
      userId,
      username,
      shindanCount: 0,
    });
  }

  async incrementCount(userId: string, username: string): Promise<void> {
    const user = await this.ensureUser(userId, username);
    await this.ctx.database.set(
      "shindan_rank",
      { userId },
      { shindanCount: user.shindanCount + 1, username },
    );
  }

  async updateName(userId: string, newName: string): Promise<void> {
    await this.ensureUser(userId, newName);
    await this.ctx.database.set("shindan_rank", { userId }, { username: newName });
  }

  async getEffectiveName(session: Session): Promise<string> {
    try {
      const observed = (await session.observeUser(["name"])) as { name?: string };
      return session.author?.nick || session.username || observed?.name || session.userId;
    } catch {
      return session.author?.nick || session.username || session.userId;
    }
  }

  async getLeaderboard(limit: number): Promise<ShindanRank[]> {
    return this.ctx.database
      .select("shindan_rank")
      .orderBy("shindanCount", "desc")
      .limit(limit)
      .execute();
  }
}

// ========================================================================
// [Service] Cooldown Manager (防刷)
// ========================================================================
class CooldownManager {
  private map = new Map<string, number>();

  constructor(private cooldownMs: number) {}

  /** 返回剩余冷却秒数；0 表示无冷却 */
  check(userId: string): number {
    if (this.cooldownMs <= 0) return 0;
    const last = this.map.get(userId) ?? 0;
    const elapsed = Date.now() - last;
    if (elapsed >= this.cooldownMs) return 0;
    return Math.ceil((this.cooldownMs - elapsed) / 1000);
  }

  hit(userId: string): void {
    if (this.cooldownMs > 0) this.map.set(userId, Date.now());
  }
}

// ========================================================================
// [Service] Message Helper
// ========================================================================
class MessageHelper {
  constructor(private ctx: Context, private config: Config) {}

  async send(session: Session, content: h.Fragment): Promise<void> {
    const msgIds = await session.send(content);
    if (this.config.retractDelay > 0 && msgIds && msgIds.length > 0) {
      const channelId = session.channelId;
      const ids = [...msgIds];
      setTimeout(() => {
        for (const id of ids) {
          session.bot.deleteMessage(channelId, id).catch(() => {});
        }
      }, this.config.retractDelay * 1000);
    }
  }
}

// ========================================================================
// [Service] Core Business Logic
// ========================================================================
class ShindanCore {
  constructor(
    private ctx: Context,
    private config: Config,
    private userService: UserService,
    private msgHelper: MessageHelper,
  ) {}

  async execute(
    session: Session,
    shindanId: string,
    name: string,
    mode: MakeShindanMode,
  ): Promise<void> {
    // 图片模式但无 puppeteer：自动降级
    if (mode === "image" && !this.ctx.puppeteer) {
      await this.msgHelper.send(session, "未检测到 puppeteer 服务，已自动降级为文本模式。");
      mode = "text";
    }

    try {
      const html = await this.fetchAndSubmit(shindanId, name);
      if (mode === "text") {
        await this.processTextResult(session, html);
      } else {
        await this.processImageResult(session, html, shindanId);
      }
    } catch (err) {
      logger.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      await this.msgHelper.send(session, `执行失败：${msg || "未知错误"}`);
    }
  }

  /** 抓取页面 + 提交表单 */
  private async fetchAndSubmit(shindanId: string, name: string): Promise<string> {
    const targetUrl = `${this.config.shindanUrl}${shindanId}`;
    const headers = Utils.generateHeaders();

    const { data: pageData, headers: resHeaders } = await Utils.retry(
      () => NetworkService.request(targetUrl, { headers }),
      this.config.maxRetryCount,
    );

    const $ = cheerio.load(pageData);
    const cookies = (resHeaders["set-cookie"] || []) as string[];
    const cookieStr = cookies.map((c) => c.split(";")[0]).join("; ");
    const xsrfRaw = cookies
      .find((c) => /^XSRF-TOKEN=/.test(c))
      ?.split(";")[0]
      ?.split("=")[1] ?? "";
    const xsrfToken = decodeURIComponent(xsrfRaw);

    const token = $('input[name="_token"]').first().val() as string | undefined;
    const randname = ($('input[name="randname"]').first().val() as string) ?? "";
    const type = ($('input[name="type"]').first().val() as string) ?? "name";

    if (!token) throw new Error("CSRF Token Not Found");

    const params = new URLSearchParams();
    params.append("_token", token);
    params.append("randname", randname);
    params.append("type", type);
    params.append("user_input_value_1", name);
    $('input[name^="parts["]').each((_, el) => {
      const key = $(el).attr("name");
      if (key) params.append(key, name);
    });

    const { data: resultData } = await Utils.retry(
      () =>
        NetworkService.request(
          targetUrl,
          {
            method: "POST",
            headers: {
              ...headers,
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: cookieStr,
              Referer: targetUrl,
              "X-XSRF-TOKEN": xsrfToken,
            },
          },
          params.toString(),
        ),
      this.config.maxRetryCount,
    );

    return resultData;
  }

  /** 文本结果 */
  private async processTextResult(session: Session, html: string): Promise<void> {
    const $ = cheerio.load(html);
    const blockData = $("#shindanResult").attr("data-blocks");
    let text = "";
    const imgUrls: string[] = [];

    if (blockData) {
      try {
        const blocks = JSON.parse(blockData);
        if (Array.isArray(blocks)) {
          for (const b of blocks) {
            if (b.type === "text") text += b.content ?? "";
            else if (b.type === "user_input") text += b.value ?? "";
            else if (b.type === "image") {
              const url = b.source || b.src || b.url;
              if (url) imgUrls.push(url);
            }
          }
        }
      } catch (e) {
        logger.warn(`Failed to parse block data: ${e}`);
      }
    }

    if (!text) {
      $("#shindanResult").find("br").replaceWith("\n");
      text = $("#shindanResult").text().trim();
      $("#shindanResult img").each((_, el) => {
        const src = $(el).attr("src");
        if (src) imgUrls.push(src);
      });
    }

    const title = $("#shindanTitle").attr("data-shindan_title") || "Result";

    // 用 Fragment 数组而非字符串拼接，正确处理图片元素
    const fragment: h.Fragment = [`${title}\n\n${text}`];
    for (const url of imgUrls) {
      fragment.push("\n", h.image(url));
    }

    await this.recordUsage(session);
    await this.msgHelper.send(session, fragment);
  }

  /** 图片结果（puppeteer 渲染） */
  private async processImageResult(
    session: Session,
    html: string,
    shindanId: string,
  ): Promise<void> {
    const $ = cheerio.load(html);
    const titleAndResult = $("#title_and_result");
    if (!titleAndResult.length) throw new Error("DOM Element Missing: #title_and_result");

    // 还原 typing/shuffle 效果（noscript 取代 effect span）
    const cleanEffects = (mode: string) => {
      titleAndResult.find(`span.shindanEffects[data-mode="${mode}"]`).each((_, el) => {
        const $el = $(el);
        const $noscript = $el.next("noscript");
        if ($noscript.length) {
          $el.replaceWith($noscript.html() || $noscript.text());
          $noscript.remove();
        }
      });
    };
    cleanEffects("ef_typing");
    cleanEffects("ef_shuffle");

    // 处理 v1-merged-image：data-image-urls -> img 标签
    titleAndResult.find("span.v1-merged-image").each((_, el) => {
      const $el = $(el);
      const urlsJson = $el.attr("data-image-urls");
      if (!urlsJson) return;
      try {
        const urls = JSON.parse(urlsJson);
        if (Array.isArray(urls)) {
          const imgs = urls
            .map(
              (url: string) =>
                `<img src="${Utils.escapeHtml(url)}" class="shindanResult_image" style="max-width:100%;height:auto;display:inline-block;">`,
            )
            .join("");
          $el.replaceWith(imgs);
        }
      } catch (e) {
        logger.warn(`Failed to parse v1-merged-image data: ${e}`);
      }
    });

    const resultHtml = $.html(titleAndResult);
    const hasChart = html.includes("chart.js") || html.includes("chartType");

    let scriptHtml = `<script src="./assets/shindan.js"></script>`;
    if (hasChart) {
      const specificScript = $("script")
        .toArray()
        .find((el) => $(el).html()?.includes(shindanId));
      scriptHtml += `
        <script src="./assets/app.js"></script>
        <script src="./assets/chart.js"></script>
        ${specificScript ? $.html(specificScript) : ""}
      `;
    }

    // 通过 <base href> 让相对路径的资源能正确加载
    const baseUrl = pathToFileURL(__dirname + "/").href;
    const fullHtml = `<!DOCTYPE html><html lang="zh"><head>
      <base href="${baseUrl}">
      <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <link rel="stylesheet" href="./assets/app.css">
      <style>body{background:white;margin:0;padding:10px;}</style>
    </head><body><div id="main-container"><div id="main">${resultHtml}</div></div>${scriptHtml}</body></html>`;

    const page = await this.ctx.puppeteer.page();
    try {
      await page.setUserAgent(Utils.randomUserAgent());
      await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 1.5 });
      await page.setContent(fullHtml, { waitUntil: "load" });

      const element = await page.$("#title_and_result");
      if (!element) throw new Error("Render Failed: Element not found");

      if (hasChart) await sleep(2000);

      const buffer = (await element.screenshot({ type: this.config.imageType })) as Buffer;

      await this.recordUsage(session);
      await this.msgHelper.send(session, h.image(buffer, `image/${this.config.imageType}`));
    } finally {
      await page.close();
    }
  }

  private async recordUsage(session: Session): Promise<void> {
    const name = await this.userService.getEffectiveName(session);
    await this.userService.incrementCount(session.userId, name);
  }

  /** 列表渲染（图片模式，OneBot 之外的平台用） */
  async renderList(
    session: Session,
    shindans: readonly ShindanDefinition[],
    page: number,
  ): Promise<void> {
    if (!this.ctx.puppeteer) {
      await session.send("列表图片渲染需要 puppeteer 服务。");
      return;
    }
    if (shindans.length === 0) {
      await session.send("列表为空。");
      return;
    }

    const pageSize = this.config.itemsPerPage;
    const totalPages = Math.ceil(shindans.length / pageSize);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIdx = (currentPage - 1) * pageSize;
    const pageItems = shindans.slice(startIdx, startIdx + pageSize);

    const css = `
      body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px; margin: 0; }
      .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; max-width: 1200px; margin: 0 auto; }
      .header { text-align: center; margin-bottom: 24px; color: #1f2937; }
      .page-info { font-size: 1.2rem; font-weight: bold; color: #4b5563; }
      .card { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; flex-direction: column; border-left: 4px solid #3b82f6; }
      .card.mode-text { border-left-color: #10b981; }
      .cmd { font-size: 1.2rem; font-weight: 700; color: #111827; margin-bottom: 4px; word-break: break-all; }
      .title { font-size: 0.95rem; color: #4b5563; flex-grow: 1; margin-bottom: 8px; line-height: 1.4; word-break: break-word; }
      .footer { font-size: 0.8rem; color: #9ca3af; display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6; }
      .tag { padding: 2px 6px; border-radius: 4px; background: #e5e7eb; color: #374151; font-weight: 600; font-size: 0.75rem; }
    `;

    const itemsHtml = pageItems
      .map(
        (s) => `
      <div class="card mode-${s.shindanMode}">
        <div class="cmd">${Utils.escapeHtml(s.shindanCommand)}</div>
        <div class="title">${Utils.escapeHtml(s.shindanTitle || "No Title")}</div>
        <div class="footer">
          <span class="id">ID: ${Utils.escapeHtml(s.shindanId)}</span>
          <span class="tag">${s.shindanMode === "image" ? "IMG" : "TXT"}</span>
        </div>
      </div>
    `,
      )
      .join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
        <div class="header"><h1>ShindanMaker Directory</h1><div class="page-info">Page ${currentPage} / ${totalPages}</div></div>
        <div class="container">${itemsHtml}</div>
      </body></html>`;

    const pageInst = await this.ctx.puppeteer.page();
    try {
      await pageInst.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1.5 });
      await pageInst.setContent(html, { waitUntil: "networkidle0" });
      const body = await pageInst.$("body");
      const buffer = (await body?.screenshot({ type: this.config.imageType })) as
        | Buffer
        | undefined;

      if (buffer) {
        await this.msgHelper.send(session, h.image(buffer, `image/${this.config.imageType}`));
        if (currentPage < totalPages) {
          await session.send(`提示: 使用 "shindan.列表 ${currentPage + 1}" 查看下一页`);
        }
      } else {
        await session.send("渲染失败。");
      }
    } catch (e) {
      logger.error("Failed to render list: ", e);
      await session.send("渲染列表时发生错误。");
    } finally {
      await pageInst.close();
    }
  }
}

// ========================================================================
// [Helpers] Prefix & Argument Parsing
// ========================================================================
function resolvePrefixes(ctx: Context, cfg: Config): string[] {
  if (cfg.commandPrefix) return [cfg.commandPrefix];
  const globalPrefix = ctx.root.config.prefix;
  if (Array.isArray(globalPrefix)) return globalPrefix.filter(Boolean);
  if (typeof globalPrefix === "string" && globalPrefix) return [globalPrefix];
  return [];
}

/** 返回去除前缀后的内容；若有前缀但未命中返回 null（应放行 next） */
function stripPrefix(text: string, prefixes: string[]): string | null {
  if (prefixes.length === 0) return text;
  const matched = prefixes.find((p) => text.startsWith(p));
  return matched === undefined ? null : text.slice(matched.length);
}

/** 解析 -t / -i 旗标和 at 标签，使用单词边界避免误伤 */
function parseFlags(
  rest: string,
  defaultMode: MakeShindanMode,
): { mode: MakeShindanMode; name: string } {
  let mode = defaultMode;

  // 多次匹配，后出现者胜出
  const matches = [...rest.matchAll(FLAG_REGEX_GLOBAL)];
  for (const m of matches) {
    mode = m[2] === "-t" ? "text" : "image";
  }

  let cleaned = rest
    .replace(FLAG_REGEX_GLOBAL, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 处理 at 标签：<at id="123" name="张三"/> -> 张三
  const atRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/g;
  cleaned = cleaned.replace(atRegex, (_, id, n) => n || id).trim();

  return { mode, name: cleaned };
}

// ========================================================================
// [Main] Entry Point
// ========================================================================
export function apply(ctx: Context, cfg: Config) {
  ctx.model.extend(
    "shindan_rank",
    {
      id: "unsigned",
      userId: "string",
      username: "string",
      shindanCount: "integer",
    },
    { primary: "id", autoInc: true },
  );

  const repo = new ShindanRepository(ctx, cfg);
  const userSvc = new UserService(ctx);
  const msgHelper = new MessageHelper(ctx, cfg);
  const cooldown = new CooldownManager(cfg.cooldown * 1000);
  const core = new ShindanCore(ctx, cfg, userSvc, msgHelper);

  ctx.on("ready", async () => {
    try {
      await repo.init();
      logger.info(`Loaded ${repo.shindans.length} shindan definitions.`);
    } catch (e) {
      logger.error("Failed to init repository: ", e);
    }
  });

  // ----- Middleware: Shortcut parsing -----
  ctx.middleware(async (session, next) => {
    const text = session.content;
    if (!text) return next();

    const prefixes = resolvePrefixes(ctx, cfg);
    const stripped = stripPrefix(text, prefixes);
    if (stripped === null) return next();

    // 按指令长度倒序匹配
    for (const shindan of repo.matchOrder) {
      if (!stripped.startsWith(shindan.shindanCommand)) continue;

      const rest = stripped.slice(shindan.shindanCommand.length).trim();
      const { mode, name } = parseFlags(rest, shindan.shindanMode);

      // Cooldown
      const remain = cooldown.check(session.userId);
      if (remain > 0) {
        return `操作过于频繁，请 ${remain} 秒后再试。`;
      }

      const finalName = name || (await userSvc.getEffectiveName(session));
      cooldown.hit(session.userId);
      return core.execute(session, shindan.shindanId, finalName, mode);
    }
    return next();
  });

  // ----- User-facing Commands -----

  ctx.command("shindan", "神断").usage("直接输入神断列表中的指令名即可");

  ctx.command("shindan.自定义 <id:string> [name:string] [mode:string]", "执行指定ID的神断")
    .usage("按ID执行任意神断（不建议使用）\n示例: shindan.自定义 1602348 你的名字 image")
    .action(async ({ session }, id, name, mode) => {
      if (!id) return "请提供神断 ID。";
      if (!Utils.isShindanId(id)) return "ID 必须为纯数字。";

      const targetMode: MakeShindanMode = isShindanMode(mode ?? "")
        ? (mode as MakeShindanMode)
        : "image";
      const targetName = name || (await userSvc.getEffectiveName(session));
      await core.execute(session, id, targetName, targetMode);
    });

  ctx.command("shindan.随机", "执行随机已收录神断")
    .action(async ({ session }) => {
      if (repo.shindans.length === 0) return "暂无任何神断条目。";
      const item = repo.shindans[Math.floor(Math.random() * repo.shindans.length)];

      if (cfg.isRandomDivineCommandVisible) {
        await session.send(item.shindanCommand);
      }
      const name = await userSvc.getEffectiveName(session);
      await core.execute(session, item.shindanId, name, item.shindanMode);
    });

  ctx.command("shindan.列表 [page:number]", "查看已收录神断列表")
    .usage("分页查看所有神断指令。\n示例: shindan.列表 1")
    .action(async ({ session }, page) => {
      if (repo.shindans.length === 0) return "列表为空。";

      // OneBot: 合并转发
      if (session.platform === "onebot") {
        const pageSize = cfg.itemsPerPage;
        const totalPages = Math.ceil(repo.shindans.length / pageSize);
        const nodes = Array.from({ length: totalPages }, (_, i) => {
          const currentPage = i + 1;
          const start = i * pageSize;
          const chunk = repo.shindans.slice(start, start + pageSize);
          const content = chunk
            .map((s) => `[${s.shindanId}] ${s.shindanCommand} - ${s.shindanTitle}`)
            .join("\n");
          return h(
            "message",
            { userId: session.userId },
            `=== Page ${currentPage}/${totalPages} ===\n${content}`,
          );
        });
        nodes.unshift(
          h("message", { userId: session.userId }, `神断列表总览\n共 ${repo.shindans.length} 项`),
        );

        try {
          await session.send(h("figure", {}, nodes));
          return;
        } catch (err) {
          logger.warn("OneBot 转发失败，降级为图片渲染:", err);
          // 失败则继续走图片渲染分支
        }
      }

      await core.renderList(session, repo.shindans, page || 1);
    });

  ctx.command("shindan.改名 <name:string>", "设置神断时使用的昵称")
    .usage("修改你在神断中使用的默认名字。\n示例: shindan.改名 旅行者")
    .action(async ({ session }, name) => {
      if (!name) return "请输入新的昵称。";
      await userSvc.updateName(session.userId, name);
      return `已更新默认昵称为：${name}`;
    });

  ctx.command("shindan.排行", "查看用户使用神断次数排行榜")
    .action(async () => {
      const list = await userSvc.getLeaderboard(cfg.defaultMaxDisplayCount);
      if (list.length === 0) return "暂无数据。";
      return `=== 神断排行榜 ===\n${list
        .map((u, i) => `${i + 1}. ${u.username} (${u.shindanCount}次)`)
        .join("\n")}`;
    });

  // ----- Admin Commands (need authority) -----

  ctx
    .command("shindan.添加 <command:string> <id:string> [mode:string]", "添加新的神断", {
      authority: cfg.adminAuthority,
    })
    .usage("shindan.添加 <命令> <ID> [模式]\n示例: shindan.添加 声优 12345 image")
    .action(async (_, cmd, id, mode = "image") => {
      if (!cmd) return "请提供指令名。";
      if (!id || !Utils.isShindanId(id)) return "ID 必须为纯数字。";
      if (!isShindanMode(mode)) return `模式只能是 ${SHINDAN_MODES.join(" / ")}。`;
      if (repo.find(cmd)) return `错误：指令 [${cmd}] 已存在。`;

      try {
        const title = await NetworkService.getShindanTitle(cfg.shindanUrl, id);
        await repo.add({
          shindanId: id,
          shindanCommand: cmd,
          shindanMode: mode,
          shindanTitle: title,
        });
        return `成功添加：${title}\n指令：${cmd} (ID: ${id})`;
      } catch (e) {
        return `添加失败：${e instanceof Error ? e.message : String(e)}`;
      }
    });

  ctx
    .command("shindan.删除 <command:string>", "删除已有的神断", { authority: cfg.adminAuthority })
    .usage("shindan.删除 <命令>\n示例: shindan.删除 声优")
    .action(async (_, cmd) => {
      if (!cmd) return "请提供要删除的指令名。";
      const ok = await repo.remove(cmd);
      return ok ? `已删除指令 [${cmd}]。` : `错误：未找到指令 [${cmd}]。`;
    });

  ctx
    .command("shindan.设置模式 <command:string> <mode:string>", "修改神断输出模式", {
      authority: cfg.adminAuthority,
    })
    .usage("shindan.设置模式 <命令> <image/text>\n示例: shindan.设置模式 声优 text")
    .action(async (_, cmd, mode) => {
      if (!cmd || !mode) return "参数不完整。";
      if (!isShindanMode(mode)) return `模式只能是 ${SHINDAN_MODES.join(" / ")}。`;
      const ok = await repo.updateMode(cmd, mode);
      return ok ? `指令 [${cmd}] 模式已更新为 [${mode}]。` : `错误：未找到指令 [${cmd}]。`;
    });

  ctx
    .command("shindan.修改 <oldCommand:string> <newCommand:string>", "修改神断指令名称", {
      authority: cfg.adminAuthority,
    })
    .usage("shindan.修改 <旧命令> <新命令>\n示例: shindan.修改 卖萌 撒娇")
    .action(async (_, oldCmd, newCmd) => {
      if (!oldCmd || !newCmd) return "参数不完整。";
      const result = await repo.updateCommandName(oldCmd, newCmd);
      return result.success
        ? `指令已重命名：[${oldCmd}] -> [${newCmd}]。`
        : `操作失败：${result.error}`;
    });
}
