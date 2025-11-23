import { Context, h, Logger, Schema, Session, sleep } from "koishi";
import {} from "koishi-plugin-puppeteer";

import fs from "fs/promises";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import crypto from "crypto";
import * as cheerio from "cheerio";
import * as https from "https";
import { URL, URLSearchParams } from "url";

// ========================================================================
// [Metadata] Crate Metadata
// ========================================================================
export const name = "shindan-maker";
export const inject = {
  required: ["database", "puppeteer"],
};

const logger = new Logger("shindan_maker");

// ========================================================================
// [Config] Configuration Schema
// ========================================================================
export interface Config {
  shindanUrl: string;
  maxRetryCount: number;
  defaultMaxDisplayCount: number;
  retractDelay: number;
  imageType: "png" | "jpeg" | "webp";
  isRandomDivineCommandVisible: boolean;
  isOfficialShindanSyncEnabled: boolean;
  itemsPerPage: number;
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    isOfficialShindanSyncEnabled: Schema.boolean().default(true).description("启动时同步内置预设"),
    shindanUrl: Schema.union([
      Schema.const("https://shindanmaker.com/").description("日语 (JP)"),
      Schema.const("https://en.shindanmaker.com/").description("英语 (EN)"),
      Schema.const("https://cn.shindanmaker.com/").description("中文 (CN)"),
      Schema.const("https://kr.shindanmaker.com/").description("韩语 (KR)"),
      Schema.const("https://th.shindanmaker.com/").description("泰语 (TH)")
    ]).default("https://cn.shindanmaker.com/").description("ShindanMaker 主站 URL"),
    maxRetryCount: Schema.number().min(1).default(3).description("最大网络重试次数"),
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
  }).description("交互配置"),
]);

// ========================================================================
// [Types] Type Definitions
// ========================================================================
type MakeShindanMode = "image" | "text";

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

  generateHeaders() {
    return { "User-Agent": this.randomUserAgent() };
  },

  async retry<T>(func: () => Promise<T>, maxRetryCount: number, delay = 500): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < maxRetryCount; i++) {
      try {
        return await func();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        await new Promise((resolve) => setTimeout(resolve, delay * 2 ** i));
      }
    }
    throw lastError!;
  },

  isNumeric(str: string): boolean {
    return !isNaN(Number(str));
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
    maxRedirects = 5
  ): Promise<{ data: string; headers: any }> {
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
      const req = https.request(requestOptions, async (res) => {
        // Handle HTTP Redirects 3xx
        if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          if (maxRedirects === 0) {
            reject(new Error('Too many redirects'));
            return;
          }
          // Follow the redirect with updated URL and decrease redirect count
          try {
            const redirectUrl = new URL(res.headers.location, url);
            resolve(await this.request(redirectUrl.toString(), options, postData, maxRedirects - 1));
          } catch (err) {
            reject(err);
          }
          req.destroy(); // Abort current request
          return;
        }

        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
            resolve({ data: body, headers: res.headers });
          } else {
            reject(new Error(`Request failed with status code: ${res.statusCode}`));
          }
        });
      });
      req.on("error", (e) => reject(e));
      if (postData) req.write(postData);
      req.end();
    });
  }

  static async getShindanTitle(prefix: string, id: string): Promise<string> {
    const url = `${prefix}${id}`;
    const { data } = await Utils.retry(() => this.request(url, { headers: Utils.generateHeaders() }), 3);
    const $ = cheerio.load(data);
    const title = $("#shindanTitle").attr("data-shindan_title") || $(".shindanTitleLink").text();
    if (!title) throw new Error("Shindan title element not found");
    return title;
  }
}

// ========================================================================
// [Service] Data Repository
// ========================================================================
class ShindanRepository {
  public shindans: ShindanDefinition[] = [];
  private readonly shindansFilePath: string;
  private readonly assetPath: string;

  constructor(private ctx: Context, private config: Config) {
    this.assetPath = path.join(__dirname, "assets", "shindans.json");
    const dataDir = path.join(ctx.baseDir, "data", "shindanMaker");
    this.shindansFilePath = path.join(dataDir, "shindans.json");

    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
    if (!existsSync(this.shindansFilePath)) writeFileSync(this.shindansFilePath, "[]", "utf-8");
  }

  async init() {
    if (this.config.isOfficialShindanSyncEnabled) {
      await this.syncOfficialShindans();
    }
    this.shindans = await this.readJSONFile(this.shindansFilePath);
    this.sort();
  }

  private async readJSONFile(filePath: string): Promise<ShindanDefinition[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private async syncOfficialShindans() {
    const builtIn = await this.readJSONFile(this.assetPath);
    const current = await this.readJSONFile(this.shindansFilePath);

    const newItems = builtIn.filter(b => !current.some(c => c.shindanId === b.shindanId));
    if (newItems.length > 0) {
      const merged = [...current, ...newItems];
      await this.save(merged);
      logger.info(`Synced ${newItems.length} new shindan definitions.`);
    }
  }

  private sort() {
    this.shindans.sort((a, b) => a.shindanCommand.localeCompare(b.shindanCommand));
  }

  async save(data: ShindanDefinition[] = this.shindans) {
    await fs.writeFile(this.shindansFilePath, JSON.stringify(data, null, 2), "utf-8");
    this.shindans = data;
  }

  find(command: string) {
    return this.shindans.find(s => s.shindanCommand === command);
  }

  add(item: ShindanDefinition) {
    this.shindans.push(item);
    this.sort();
    return this.save();
  }

  remove(command: string) {
    const index = this.shindans.findIndex(s => s.shindanCommand === command);
    if (index === -1) return false;
    this.shindans.splice(index, 1);
    this.save();
    return true;
  }

  // New Method: Update output mode
  updateMode(command: string, mode: MakeShindanMode) {
    const item = this.find(command);
    if (!item) return false;
    item.shindanMode = mode;
    this.save();
    return true;
  }

  // New Method: Rename command
  updateCommandName(oldCommand: string, newCommand: string) {
    const item = this.find(oldCommand);
    if (!item) return { success: false, error: "指令不存在" };

    const exists = this.find(newCommand);
    if (exists) return { success: false, error: "目标指令名已被占用" };

    item.shindanCommand = newCommand;
    this.sort();
    this.save();
    return { success: true };
  }
}

// ========================================================================
// [Service] User & Rank Logic
// ========================================================================
class UserService {
  constructor(private ctx: Context) {}

  async ensureUser(userId: string, username: string) {
    const exists = await this.ctx.database.get("shindan_rank", { userId });
    if (exists.length === 0) {
      await this.ctx.database.create("shindan_rank", { userId, username, shindanCount: 0 });
    }
    return exists[0];
  }

  async incrementCount(userId: string, username: string) {
    const user = await this.ensureUser(userId, username);
    await this.ctx.database.set(
      "shindan_rank",
      { userId },
      { shindanCount: (user?.shindanCount || 0) + 1, username }
    );
  }

  async updateName(userId: string, newName: string) {
    await this.ensureUser(userId, newName);
    await this.ctx.database.set("shindan_rank", { userId }, { username: newName });
  }

  async getEffectiveName(session: Session, config: Config): Promise<string> {
    const observedUser = await session.observeUser(["name"]) as { name?: string };
    return session.author.nick || session.username || observedUser.name || session.userId;
  }

  async getLeaderboard(limit: number): Promise<ShindanRank[]> {
    return this.ctx.database.select('shindan_rank')
      .orderBy('shindanCount', 'desc')
      .limit(limit)
      .execute();
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
    private msgHelper: MessageHelper
  ) {}

  async execute(session: Session, shindanId: string, name: string, mode: MakeShindanMode) {
    const { shindanUrl, maxRetryCount } = this.config;
    const targetUrl = `${shindanUrl}${shindanId}`;
    const headers = Utils.generateHeaders();

    try {
      const { data: pageData, headers: resHeaders } = await Utils.retry(
        () => NetworkService.request(targetUrl, { headers }), maxRetryCount
      );

      const $ = cheerio.load(pageData);
      const cookies = resHeaders["set-cookie"] || [];
      const cookieStr = cookies.map((c: string) => c.split(";")[0]).join("; ");
      const xsrfToken = decodeURIComponent(
        cookies.find((c: string) => c.startsWith("XSRF-TOKEN="))?.split(";")[0].split("=")[1] || ""
      );

      const token = $('input[name="_token"]').first().val() as string;
      const randname = $('input[name="randname"]').first().val() as string;
      const type = $('input[name="type"]').first().val() as string;

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
        () => NetworkService.request(targetUrl, {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": cookieStr,
            "Referer": targetUrl,
            "X-XSRF-TOKEN": xsrfToken,
          }
        }, params.toString()), maxRetryCount
      );

      if (mode === "text") {
        await this.processTextResult(session, resultData);
      } else {
        await this.processImageResult(session, resultData, shindanId);
      }

    } catch (err) {
      logger.error(err);
      await this.msgHelper.send(session, "执行失败：无法连接到神断服务或解析错误。");
    }
  }

  // Render List as Image (for non-OneBot platforms)
  async renderList(session: Session, allShindans: ShindanDefinition[], page: number) {
    if (allShindans.length === 0) {
        return session.send("列表为空。");
    }

    const pageSize = this.config.itemsPerPage;
    const totalPages = Math.ceil(allShindans.length / pageSize);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageItems = allShindans.slice(startIdx, endIdx);

    const css = `
      body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px; margin: 0; }
      .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; max-width: 1200px; margin: 0 auto; }
      .header { text-align: center; margin-bottom: 24px; color: #1f2937; }
      .page-info { font-size: 1.2rem; font-weight: bold; color: #4b5563; }
      .card { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; flex-direction: column; border-left: 4px solid #3b82f6; }
      .card.mode-text { border-left-color: #10b981; }
      .cmd { font-size: 1.2rem; font-weight: 700; color: #111827; margin-bottom: 4px; }
      .title { font-size: 0.95rem; color: #4b5563; flex-grow: 1; margin-bottom: 8px; line-height: 1.4; }
      .footer { font-size: 0.8rem; color: #9ca3af; display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6; }
      .tag { padding: 2px 6px; border-radius: 4px; background: #e5e7eb; color: #374151; font-weight: 600; font-size: 0.75rem; }
    `;

    const itemsHtml = pageItems.map(s => `
      <div class="card mode-${s.shindanMode}">
        <div class="cmd">${s.shindanCommand}</div>
        <div class="title">${s.shindanTitle || 'No Title'}</div>
        <div class="footer">
          <span class="id">ID: ${s.shindanId}</span>
          <span class="tag">${s.shindanMode === 'image' ? 'IMG' : 'TXT'}</span>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
        <div class="header"><h1>ShindanMaker Directory</h1><div class="page-info">Page ${currentPage} / ${totalPages}</div></div>
        <div class="container">${itemsHtml}</div>
      </body></html>`;

    const pageInst = await this.ctx.puppeteer.page();
    try {
      await pageInst.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1.5 });
      await pageInst.setContent(html, { waitUntil: 'networkidle0' });
      const body = await pageInst.$('body');
      const buffer = await body?.screenshot({ type: this.config.imageType});

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

  private async processTextResult(session: Session, html: string) {
    const $res = cheerio.load(html);
    const blockData = $res("#shindanResult").attr("data-blocks");
    let text = "";
    let imgUrl = "";

    if (blockData) {
      try {
        const blocks = JSON.parse(blockData);
        blocks.forEach((b: any) => {
          if (b.type === "text") text += b.content;
          if (b.type === "user_input") text += b.value;
          if (b.type === "image") imgUrl = b.source || b.src || b.url;
        });
      } catch (e) {
        logger.warn(`Failed to parse block data: ${e}`);
      }
    }

    if (!text) {
      $res("#shindanResult").find("br").replaceWith("\n");
      text = $res("#shindanResult").text().trim();
      imgUrl = $res("#shindanResult img").attr("src") || "";
    }

    const title = $res("#shindanTitle").attr("data-shindan_title") || "Result";
    const output = `${title}\n\n${text}${imgUrl ? `\n${h.image(imgUrl)}` : ""}`;

    await this.recordUsage(session);
    await this.msgHelper.send(session, output);
  }

  private async processImageResult(session: Session, html: string, shindanId: string) {
    const $ = cheerio.load(html);
    const titleAndResult = $("#title_and_result");
    if (!titleAndResult.length) throw new Error("DOM Element Missing: #title_and_result");

    const cleanEffects = (mode: string) => {
      titleAndResult.find(`span.shindanEffects[data-mode="${mode}"]`).each((i, el) => {
        const $el = $(el);
        const $noscript = $el.next('noscript');
        if ($noscript.length) {
          $el.replaceWith($noscript.html() || $noscript.text());
          $noscript.remove();
        }
      });
    };
    cleanEffects('ef_typing');
    cleanEffects('ef_shuffle');

    const resultHtml = $.html(titleAndResult);

    const hasChart = html.includes("chart.js") || html.includes("chartType");
    let scriptHtml = `<script src="./assets/shindan.js"></script>`;
    if (hasChart) {
      const specificScript = $("script").toArray().find(el => $(el).html()?.includes(shindanId));
      scriptHtml += `
        <script src="./assets/app.js"></script>
        <script src="./assets/chart.js"></script>
        ${specificScript ? $.html(specificScript) : ""}
      `;
    }

    const fullHtml = `<!DOCTYPE html><html lang="zh"><head>
        <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="./assets/app.css">
        <style>body{background:white;margin:0;padding:10px;}</style>
      </head><body><div id="main-container"><div id="main">${resultHtml}</div></div>${scriptHtml}</body></html>`;

    const page = await this.ctx.puppeteer.page();
    try {
      const dummyPath = "file://" + path.join(__dirname, "empty.html");
      await page.setUserAgent(Utils.randomUserAgent());
      try { await page.goto(dummyPath); } catch {}

      await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 1.5 });
      await page.setContent(fullHtml, { waitUntil: "load" });

      const element = await page.$("#title_and_result");
      if (!element) throw new Error("Render Failed: Element not found");

      if (hasChart) await sleep(2000);

      const buffer = await element.screenshot({ type: this.config.imageType });

      await this.recordUsage(session);
      await this.msgHelper.send(session, h.image(buffer, `image/${this.config.imageType}`));
    } finally {
      await page.close();
    }
  }

  private async recordUsage(session: Session) {
    const name = await this.userService.getEffectiveName(session, this.config);
    await this.userService.incrementCount(session.userId, name);
  }
}

// ========================================================================
// [Service] Message Helper
// ========================================================================
class MessageHelper {
  constructor(private ctx: Context, private config: Config) {}

  async send(session: Session, content: string | h.Fragment) {
    const msgIds = await session.send(content);
    if (this.config.retractDelay > 0 && msgIds.length > 0) {
      const id = msgIds[0];
      setTimeout(() => {
        try { session.bot.deleteMessage(session.channelId, id); } catch {}
      }, this.config.retractDelay * 1000);
    }
  }
}

// ========================================================================
// [Main] Entry Point
// ========================================================================
export function apply(ctx: Context, cfg: Config) {
  ctx.model.extend("shindan_rank", {
    id: "unsigned",
    userId: "string",
    username: "string",
    shindanCount: "integer",
  }, { primary: "id", autoInc: true });

  const repo = new ShindanRepository(ctx, cfg);
  const userSvc = new UserService(ctx);
  const msgHelper = new MessageHelper(ctx, cfg);
  const core = new ShindanCore(ctx, cfg, userSvc, msgHelper);

  ctx.on("ready", () => repo.init());

  // Middleware: Shortcut parsing
  ctx.middleware(async (session, next) => {
    const text = session.content;
    if (!text) return next();

    for (const shindan of repo.shindans) {
      if (text.startsWith(shindan.shindanCommand)) {
        const rest = text.slice(shindan.shindanCommand.length).trim();
        let mode: MakeShindanMode = shindan.shindanMode;
        let name = rest;

        if (rest.includes("-t")) { mode = "text"; name = rest.replace("-t", "").trim(); }
        if (rest.includes("-i")) { mode = "image"; name = rest.replace("-i", "").trim(); }

        if (!name) name = await userSvc.getEffectiveName(session, cfg);

        const atRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/g;
        name = name.replace(atRegex, (_, id, n) => n || id).trim();

        return core.execute(session, shindan.shindanId, name, mode);
      }
    }
    return next();
  });

  // --- Commands ---

  ctx.command("shindan", "神断").usage("直接输入神断列表中的指令名即可")

  ctx.command("shindan.自定义 <id:string> [name:string] [mode:string]", "执行指定ID的神断")
    .usage("按ID执行任意神断（该指令不建议使用）\n示例: shindan.自定义 1602348 你的名字 image")
    .action(async ({ session }, id, name, mode) => {
      if (!id) return session.execute("shindan.自定义 -h");
      if (!Utils.isNumeric(id)) return session.execute("shindan.自定义 -h");

      const targetName = name || await userSvc.getEffectiveName(session, cfg);
      const targetMode = (mode === "text" ? "text" : "image") as MakeShindanMode;
      await core.execute(session, id, targetName, targetMode);
    });

  ctx.command("shindan.随机", "执行随机已收录神断")
    .action(async ({ session }) => {
      if (repo.shindans.length === 0) return session.execute("shindan.随机 -h");
      const item = repo.shindans[Math.floor(Math.random() * repo.shindans.length)];

      if (cfg.isRandomDivineCommandVisible) {
        await session.send(`${item.shindanCommand}`);
      }

      const name = await userSvc.getEffectiveName(session, cfg);
      await core.execute(session, item.shindanId, name, item.shindanMode);
    });

  ctx.command("shindan.列表 [page:number]", "查看已收录神断列表")
    .usage("分页查看所有神断指令。\n示例: shindan.列表 1")
    .action(async ({ session }, page) => {
      if (repo.shindans.length === 0) return session.execute("shindan.列表 -h");

      // OneBot: Merge Forward
      if (session.platform === "onebot") {
        const pageSize = cfg.itemsPerPage;
        const totalPages = Math.ceil(repo.shindans.length / pageSize);
        const nodes = Array.from({ length: totalPages }, (_, i) => {
          const currentPage = i + 1;
          const start = i * pageSize;
          const chunk = repo.shindans.slice(start, start + pageSize);
          const content = chunk.map(s => `[${s.shindanId}] ${s.shindanCommand} - ${s.shindanTitle}`).join("\n");
          return h("message", { userId: session.userId }, `=== Page ${currentPage}/${totalPages} ===\n${content}`);
        });
        nodes.unshift(h("message", { userId: session.userId }, `神断列表总览\n共 ${repo.shindans.length} 项`));

        try { await session.send(h("figure", {}, nodes)); return; }
        catch (err) { logger.warn("OneBot转发失败:", err); return "转发失败，请检查日志。"; }
      }

      // Others: Render Image
      return core.renderList(session, repo.shindans, page || 1);
    });

  ctx.command("shindan.改名 <name:string>", "设置神断时使用的昵称")
    .usage("修改你在神断中使用的默认名字。\n示例: shindan.改名 旅行者")
    .action(async ({ session }, name) => {
      if (!name) return session.execute("shindan.改名 -h");
      await userSvc.updateName(session.userId, name);
      return `已更新默认昵称为：${name}`;
    });

  ctx.command("shindan.排行", "查看用户使用神断次数排行榜")
    .action(async () => {
      const list = await userSvc.getLeaderboard(cfg.defaultMaxDisplayCount);
      if (list.length === 0) return "暂无数据。";
      return `=== 神断排行榜 ===\n${list.map((u, i) => `${i + 1}. ${u.username} (${u.shindanCount}次)`).join("\n")}`;
    });

  ctx.command("shindan.添加 <command:string> <id:string> [mode:string]", "添加新的神断")
    .usage("shindan.添加 &lt;命令&gt; &lt;ID&gt; [模式]\n示例: shindan.添加 声优 12345 image")
    .action(async ({ session }, cmd, id, mode = "image") => {
      if (!id || !Utils.isNumeric(id)) return session.execute("shindan.添加 -h");
      if (!cmd) return session.execute("shindan.添加 -h");
      if (repo.find(cmd)) return `错误：指令 [${cmd}] 已存在。`;

      try {
        const title = await NetworkService.getShindanTitle(cfg.shindanUrl, id);
        await repo.add({
            shindanId: id,
            shindanCommand: cmd,
            shindanMode: mode as MakeShindanMode,
            shindanTitle: title
        });
        return `成功添加：${title}\n指令：${cmd} (ID: ${id})`;
      } catch (e) {
        return `添加失败：${e.message}`;
      }
    });

  ctx.command("shindan.删除 <command:string>", "删除已有的神断")
    .usage("shindan.删除 &lt;命令&gt;\n示例: shindan.删除 声优")
    .action(async ({ session }, cmd) => {
      if (!cmd) return session.execute("shindan.删除 -h");
      if (repo.remove(cmd)) return `已删除指令 [${cmd}]。`;
      return `错误：未找到指令 [${cmd}]。`;
    });

  ctx.command("shindan.设置模式 <command:string> <mode:string>", "修改神断输出模式")
    .usage("shindan.设置模式 &lt;命令&gt; &lt;image/text&gt;\n示例: shindan.设置模式 声优 text")
    .action(async ({ session }, cmd, mode) => {
      if (!cmd || !mode) return session.execute("shindan.设置模式 -h");
      if (mode !== "image" && mode !== "text") return session.execute("shindan.设置模式 -h");

      if (repo.updateMode(cmd, mode as MakeShindanMode)) return `指令 [${cmd}] 模式已更新为 [${mode}]。`;
      return `错误：未找到指令 [${cmd}]。`;
    });

  ctx.command("shindan.修改 <oldCommand:string> <newCommand:string>", "修改神断指令名称")
    .usage("shindan.修改 &lt;旧命令&gt; &lt;新命令&gt;\n示例: shindan.修改 卖萌 撒娇")
    .action(async ({ session }, oldCmd, newCmd) => {
      if (!oldCmd || !newCmd) return session.execute("shindan.修改 -h");

      const result = repo.updateCommandName(oldCmd, newCmd);
      if (result.success) return `指令已重命名：[${oldCmd}] -> [${newCmd}]。`;
      return `操作失败：${result.error}`;
    });
}
