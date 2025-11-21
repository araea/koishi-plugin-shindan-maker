import { Context, h, Logger, noop, Schema, sleep } from "koishi";
import {} from "koishi-plugin-markdown-to-image-service";
import {} from "koishi-plugin-puppeteer";

import fs from "fs";
import path from "path";
import crypto from "crypto";
import * as cheerio from "cheerio";

import * as https from "https";
import { URL } from "url";
import { Element } from "domhandler";

export const inject = {
  required: ["database", "puppeteer"],
  optional: ["markdownToImage"],
};
export const name = "shindan-maker";
export const usage = `## 使用

1. 安装 \`puppeteer\` 服务。
2. 设置指令别名。
3. 发送 \`shindan.列表\` 查看神断指令列表。
4. 发送神断指令，如 \`抽老婆\`，即可生成对应的神断结果。
5. 参数 \`-t\` 或 \`-i\` 指定生成的神断结果是文本模式还是图片模式。

## QQ 群

- 956758505
`;
const logger = new Logger(`shindanMaker`);

// pz* pzx*
export interface Config {
  shindanUrl: string;
  maxRetryCount: number;
  defaultMaxDisplayCount: number;
  defaultShindansBatchCount: number;

  key: string;
  retractDelay: number;
  customTemplateId: string;
  imageType: "png" | "jpeg" | "webp";
  isTextToImageConversionEnabled: boolean;
  shouldPrefixUsernameInMessageSending: boolean;
  isEnableQQOfficialRobotMarkdownTemplate: boolean;

  numberOfMessageButtonsPerRow: number;
  isRandomDivineCommandVisible: boolean;
  shouldMiddlewareInterruptAfterDivineDirective: boolean;
  isOfficialShindanSyncEnabled: boolean;
}

// config
export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    isOfficialShindanSyncEnabled: Schema.boolean()
      .default(true)
      .description(
        `是否与插件内置神断保持同步，关闭后，将不会再为你新增任何神断，默认为 \`true\`。`
      ),
  }).description("神断同步设置"),
  Schema.object({
    shindanUrl: Schema.string()
      .default("en.shindanmaker")
      .description(
        `神断 url，可选前缀有：en, kr, cn, th, 无前缀（en 没被墙）。`
      ),
  }).description("神断网 URL"),
  Schema.object({
    maxRetryCount: Schema.number()
      .min(1)
      .default(3)
      .description(`最大重试次数。`),
  }).description("请求设置"),
  Schema.object({
    imageType: Schema.union(["png", "jpeg", "webp"])
      .default("png")
      .description(`图片类型。`),
    shouldPrefixUsernameInMessageSending: Schema.boolean()
      .default(true)
      .description(`是否在发送消息时加上 @用户名。`),
    retractDelay: Schema.number()
      .min(0)
      .default(0)
      .description(
        `自动撤回等待的时间，单位是秒。值为 0 时不启用自动撤回功能。`
      ),
    isTextToImageConversionEnabled: Schema.boolean()
      .default(false)
      .description(
        `是否开启将文本转为图片的功能（可选），如需启用，需要启用 \`markdownToImage\` 服务。`
      ),
    isEnableQQOfficialRobotMarkdownTemplate: Schema.boolean()
      .default(false)
      .description(`是否启用 QQ 官方机器人的 Markdown 模板，带消息按钮。`),
  }).description("消息发送设置"),
  Schema.union([
    Schema.object({
      isEnableQQOfficialRobotMarkdownTemplate: Schema.const(true).required(),
      customTemplateId: Schema.string()
        .default("")
        .description(`自定义模板 ID。`),
      key: Schema.string()
        .default("")
        .description(
          `文本内容中特定插值的 key，用于存放文本。如果你的插值为 {{.info}}，那么请在这里填 info。`
        ),
      numberOfMessageButtonsPerRow: Schema.number()
        .min(2)
        .max(5)
        .default(2)
        .description(`每行消息按钮的数量。`),
    }),
    Schema.object({}),
  ]),

  Schema.object({
    isRandomDivineCommandVisible: Schema.boolean()
      .default(true)
      .description(`随机神断的时候是否显示神断指令名，默认为 \`true\`。`),
  }).description("随机神断设置"),
  Schema.object({
    defaultMaxDisplayCount: Schema.number()
      .min(0)
      .default(20)
      .description(`排行榜默认显示的人数，默认值为 \`20\`。`),
  }).description("排行榜设置"),
  Schema.object({
    defaultShindansBatchCount: Schema.number()
      .min(1)
      .max(10)
      .default(4)
      .description(
        `（QQ官方机器人请调整至4及以下）发送神断列表默认的批次数，最大值为 \`10\`，默认为 \`4\`。`
      ),
  }).description("神断列表设置"),
  Schema.object({
    shouldMiddlewareInterruptAfterDivineDirective: Schema.boolean()
      .default(true)
      .description(`中间件是否在获取神断指令之后中断，默认为 \`true\`。`),
  }).description("中间件设置"),
]) as any;

type MakeShindanMode = "image" | "text";

// smb*
declare module "koishi" {
  interface Tables {
    shindan_rank: ShindanRank;
  }
}

// jk*
export interface ShindanRank {
  id: number;
  userId: string;
  username: string;
  shindanCount: number;
}

// zhs*
export async function apply(ctx: Context, config: Config) {
  // tzb*
  ctx.model.extend(
    "shindan_rank",
    {
      id: "unsigned",
      userId: "string",
      username: "string",
      shindanCount: "integer",
    },
    { primary: "id", autoInc: true }
  );

  // cl*
  const {
    shindanUrl,
    maxRetryCount,
    imageType,
    defaultMaxDisplayCount,
    isRandomDivineCommandVisible,
    shouldMiddlewareInterruptAfterDivineDirective,
    isOfficialShindanSyncEnabled,
    defaultShindansBatchCount,
  } = config;

  const BROWSER_CIPHERS = [
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
    "ECDHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-AES256-GCM-SHA384",
  ].join(":");

  const isQQOfficialRobotMarkdownTemplateEnabled =
    config.isEnableQQOfficialRobotMarkdownTemplate &&
    config.key !== "" &&
    config.customTemplateId !== "";

  interface Shindan {
    shindanId: string;
    shindanCommand: string;
    shindanMode: string;
    shindanTitle: string;
  }

  async function ensureDirExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  async function readJSONFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
    return [];
  }

  async function writeJSONFile(filePath: string, data: any) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf-8");
  }

  const filePath = path.join(__dirname, "assets", "shindans.json");
  const shindansDirPath = path.join(ctx.baseDir, "data", "shindanMaker");
  const shindansFilePath = path.join(shindansDirPath, "shindans.json");

  await ensureDirExists(shindansDirPath);

  async function ensureFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
    }
  }

  await ensureFileExists(shindansFilePath);

  async function handleOfficialShindanSync() {
    if (isOfficialShindanSyncEnabled) {
      const shindansData = await readJSONFile(filePath);
      let targetShindansData = await readJSONFile(shindansFilePath);

      const missingShindans = shindansData.filter((shindan: any) => {
        return !targetShindansData.some(
          (targetShindan: any) => targetShindan.shindanId === shindan.shindanId
        );
      });

      targetShindansData = targetShindansData.concat(missingShindans);
      await writeJSONFile(shindansFilePath, targetShindansData);

      if (missingShindans.length > 0) {
        logger.success("添加的 shindan 对象：", missingShindans);
      }
    }
  }

  await handleOfficialShindanSync();

  const fileContent = await fs.promises.readFile(shindansFilePath, "utf-8");
  const shindans: Shindan[] = JSON.parse(fileContent);
  shindans.sort((a, b) => a.shindanCommand.localeCompare(b.shindanCommand));

  // zjj*
  ctx.middleware(async (session, next) => {
    let { content } = session;
    let isText = false;
    let isImage = false;
    let modifiedContent = content;
    if (content.includes("-t")) {
      isText = true;
      modifiedContent = content.replace("-t", "");
    } else if (content.includes("-i")) {
      isImage = true;
      modifiedContent = content.replace("-i", "");
    }

    async function extractCommandAndShindanName(
      content: string
    ): Promise<{ command: string; shindanName: string }> {
      content = await replaceAtTags(session, content);

      const atTagRegex = /<at id=['"][^'"]+['"](?: name=['"][^'"]+['"])?\/>/g;

      const frontAtTagRegex =
        /^<at id=['"][^'"]+['"](?: name=['"][^'"]+['"])?\/>\s*/;
      content = content.replace(frontAtTagRegex, "");

      const atTags = content.match(atTagRegex);

      let commandAndShindan = content.replace(atTagRegex, "").trim();

      let splitIndex = commandAndShindan.indexOf(" ");
      let command = commandAndShindan;
      let shindanName = "";

      if (splitIndex !== -1) {
        command = commandAndShindan.substring(0, splitIndex);
        shindanName = commandAndShindan.substring(splitIndex + 1).trim();
      }

      shindanName =
        (atTags ? atTags.join(" ") : "") +
        (shindanName ? " " + shindanName : "");

      if (!shindanName) {
        shindanName = "nawyjxxjywan";
      }

      return { command, shindanName };
    }

    const result = await extractCommandAndShindanName(modifiedContent);

    const { command, shindanName } = result;
    const shindan = shindans.find((s) => s.shindanCommand === command);

    if (shindan) {
      let { shindanId, shindanMode } = shindan;
      if (isText) {
        shindanMode = "text";
      } else if (isImage) {
        shindanMode = "image";
      }
      await session.execute(
        `shindan.自定义 ${shindanId} '${shindanName}' ${shindanMode}`
      );
      return shouldMiddlewareInterruptAfterDivineDirective
        ? noop()
        : await next();
    } else {
      await next();
    }
  });

  // zl*
  // h* bz*
  ctx
    .command("shindan", "查看神断帮助")
    .usage(`神断资源：${shindanUrl}.com。`)
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }) => {
      //
      if (
        isQQOfficialRobotMarkdownTemplateEnabled &&
        session.platform === "qq"
      ) {
        return await sendMessage(
          session,
          `🔮 《神断占卜器》 🔮
😆 欢迎游玩~ 祝您玩得开心！`,
          `神断列表 神断次数排行榜 改名 神断统计 随机神断`,
          2,
          false
        );
      }
      await session.execute(`shindan -h`);
      //
    });
  //tj*
  ctx
    .command("shindan.统计 [targetUser:text]", "查看统计信息")
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }, targetUser) => {
      //
      let { channelId, userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      const result = await processTargetUser(
        session,
        userId,
        username,
        targetUser
      );
      const targetUserRecord: ShindanRank[] = result.targetUserRecord;
      const targetUserId: string = result.targetUserId;
      if (targetUserRecord.length === 0) {
        return await sendMessage(
          session,
          `该统计对象无神断记录。`,
          `改名 神断统计 随机神断`
        );
      }
      const guildUsers = await ctx.database.get("shindan_rank", {});
      guildUsers.sort((a, b) => b.shindanCount - a.shindanCount);

      const userIndex = guildUsers.findIndex((user) => user.userId === userId);
      const userRank = userIndex === -1 ? undefined : userIndex + 1;

      return await sendMessage(
        session,
        `统计对象：${targetUserRecord[0].username}

神断次数：${targetUserRecord[0].shindanCount} 次。
排名：第 ${userRank} 名。`,
        `改名 神断统计 随机神断`
      );

      //
    });
  // phb* r*
  ctx
    .command("shindan.排行榜 [number:number]", "神断次数排行榜")
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }, number: number) => {
      let { channelId, userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      const maxNumber = number || defaultMaxDisplayCount;

      if (typeof maxNumber !== "number" || maxNumber <= 0) {
        return await sendMessage(
          session,
          `参数 number 必须为正整数！`,
          `改名 神断次数排行榜 随机神断`
        );
      }

      const shindanUsers = await ctx.database.get("shindan_rank", {});

      shindanUsers.sort((a, b) => b.shindanCount - a.shindanCount);

      const limitedUsers = shindanUsers.slice(0, maxNumber); // 仅保留排行榜中的前 maxNumber 个用户

      const rankStrings: string[] = limitedUsers.map(
        (user, index: number) =>
          `${index + 1}. ${user.username}：${user.shindanCount} 次`
      );

      return await sendMessage(
        session,
        `神断次数排行榜：\n\n${rankStrings.join("\n")}`,
        `改名 神断次数排行榜 随机神断`
      );
    });

  // ck*
  ctx
    .command("shindan.查看 <shindanCommand:text>", "查看神断")
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }, shindanCommand) => {
      let { channelId, userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      // 查看：
      if (!shindanCommand) {
        return await sendMessage(
          session,
          `请提供必要参数 shindanCommand。

指令格式：
查看神断 [shindanCommand]

指令示例：
查看神断 今天是什么少女`,
          `改名 查看神断 随机神断`
        );
      }
      const existingShindan = shindans.find(
        (shindan) => shindan.shindanCommand === shindanCommand
      );
      if (!existingShindan) {
        return await sendMessage(
          session,
          `指定神断不存在。`,
          `改名 查看神断 随机神断`
        );
      }
      const { shindanId, shindanMode, shindanTitle } = existingShindan;
      return await sendMessage(
        session,
        `神断 '${shindanCommand}' 信息如下：

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`,
        `改名 查看神断 随机神断`
      );
      //
    });
  // sj* sjsd*
  ctx
    .command("shindan.随机 [shindanName:text]", "随机神断")
    .userFields(["id", "name", "permissions"])
    .option("text", "-t 文本模式")
    .option("image", "-i 图片模式")
    .action(async ({ session, options }, shindanName) => {
      let { channelId, userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      //
      if (!shindanName) {
        shindanName = username;
      }
      shindanName = await replaceAtTags(session, shindanName);
      // 判断 shindanName 中是否存在 <at id='' name= ''/> 或 <at id=''/> 这样的内容
      const userIdRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/g;
      let modifiedShindanName = shindanName;
      let matches: any;

      while ((matches = userIdRegex.exec(shindanName)) !== null) {
        const [, , name] = matches;
        if (name) {
          modifiedShindanName = modifiedShindanName.replace(matches[0], name);
        }
      }

      shindanName = modifiedShindanName;

      function getRandomShindan(shindans: Shindan[]): Shindan | null {
        if (shindans.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * shindans.length);
        return shindans[randomIndex];
      }

      const randomShindan = getRandomShindan(shindans);
      let { shindanId, shindanMode, shindanCommand } = randomShindan;
      if (options.text) {
        shindanMode = "text";
      } else if (options.image) {
        shindanMode = "image";
      }
      isRandomDivineCommandVisible
        ? await sendMessage(session, `神断指令：${shindanCommand}`, ``)
        : noop();
      await session.execute(
        `shindan.自定义 ${shindanId} '${shindanName}' ${shindanMode}`
      );
      //
    });
  // lb*
  ctx
    .command("shindan.列表 [batchCount:number]", "神断列表")
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }, batchCount = defaultShindansBatchCount) => {
      let { channelId, userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      if (isNaN(batchCount) || batchCount <= 0) {
        return await sendMessage(
          session,
          `批次数必须是一个大于 0 的数字！`,
          `改名 神断列表 随机神断`
        );
      }
      if (batchCount > 10)
        return await sendMessage(
          session,
          `批次数超出范围，最大值为 10。`,
          `改名 神断列表 随机神断`
        );
      const totalShindans = shindans.length;
      const batchSize = Math.floor(totalShindans / batchCount); // 每批处理的数量
      let serialNumber = 1; // 序号变量
      let tableRows = [];

      const tableStyle = `
      <style>
      body {
        margin: 0;
        zoom: 200%;
      }
      .list {
        display: flex;
        flex-direction: column;
        width: max-content;
        overflow: scroll;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        height: min-content;
        border: 1px solid #ddd;
      }
      th,
      td {
        text-align: left;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-right: 5px;
        display: flex;
        flex-direction: column;
        width: max-content;
      }
      tr:nth-child(even) {
        background-color: #f5f5f5;
      }
      .line1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: max-content;
      }
      .line2 {
        display: flex;
        flex-direction: row;
        width: max-content;
      }
      .id {
        color: #444444;
        font-size: x-small;
        background-color: #f8f8f8;
        padding: 1px 3px;
        border-radius: 5px;
        border-color: #dee2e6;
        border-style: solid;
        border-width: 1px;
        margin-left: 5px;
      }
      .command {
        color: #444444;
        margin-left: 5px;
      }
      .title {
        color: #6c757d;
        font-size: xx-small;
        margin-left: 10px;
      }
      </style>
    `;

      const generateTable = (rows: any): string => {
        return `
        <html lang="zh">
          <head>
            ${tableStyle}
          <title>神断列表</title></head>
          <body>
            <div class="list">
              <table>
                ${rows.join("\n")}
              </table>
            </div>
          </body>
        </html>
      `;
      };

      const browser = ctx.puppeteer.browser;
      const page = await browser.newPage();
      await page.setViewport({ width: 100, height: 100 });

      for (let i = 1; i <= totalShindans; i++) {
        const shindan = shindans[i - 1];
        const row = `
        <tr>
          <td>
            <div class="line1">
              <div class="id">${shindan.shindanId}</div>
              <div class="command">${serialNumber++}. ${
          shindan.shindanCommand
        }</div>
            </div>
            <div class="line2">
              <div class="title">${shindan.shindanTitle}</div>
            </div>
          </td>
        </tr>
      `;
        tableRows.push(row);

        if (i % batchSize === 0 || i === totalShindans) {
          const html = generateTable(tableRows);
          await page.setContent(html, { waitUntil: "load" });
          await page.bringToFront();
          const imgBuffer = await page.screenshot({
            fullPage: true,
            type: imageType,
          });
          await sendMessage(
            session,
            h.image(imgBuffer, `image/${imageType}`),
            ``,
            2,
            false
          );
          tableRows = [];
        }
      }

      await page.close();
    });

  // tj*
  ctx
    .command(
      "shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]",
      "添加神断"
    )
    .action(
      async (
        { session },
        shindanId,
        shindanCommand,
        shindanMode: MakeShindanMode = "image"
      ) => {
        let { userId, username } = session;
        username = await getSessionUserName(session);
        await updateNameInPlayerRecord(session, userId, username);
        if (!shindanId || !shindanCommand) {
          await sendMessage(
            session,
            `参数缺失，请提供 shindanId 或 shindanCommand。

指令格式：
添加神断 [shindanId] [shindanCommand] [shindanMode]

使用示例：
添加神断 1116736 OC生成器 image
添加神断 1116736 OC生成器 text`,
            `改名 添加神断 随机神断`
          );
          return;
        }

        if (!isShindanIdValid(shindanId)) {
          return await sendMessage(
            session,
            `shindanId 格式错误，请输入一个有效的 shindanId。`,
            `改名 添加神断 随机神断`
          );
        }

        if (!isMakeShindanMode(shindanMode)) {
          return await sendMessage(
            session,
            `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`,
            `改名 添加神断 随机神断`
          );
        }

        const existingShindanCommand = shindans.find(
          (shindan) => shindan.shindanCommand === shindanCommand
        );

        if (existingShindanCommand) {
          return await sendMessage(
            session,
            `添加失败：神断指令 '${shindanCommand}' 重复。`,
            `改名 添加神断 随机神断`
          );
        }

        const existingShindan = shindans.find(
          (shindan) => shindan.shindanId === shindanId
        );

        if (existingShindan) {
          const { shindanCommand, shindanTitle, shindanMode } = existingShindan;
          return await sendMessage(
            session,
            `神断 '${shindanId}' 已存在。

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`,
            `改名 添加神断 随机神断`
          );
        } else {
          let shindanTitle: string;
          try {
            shindanTitle = await getShindanTitle(shindanId);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              return await sendMessage(
                session,
                `添加失败：该 shindanId 页面 404。`,
                `改名 添加神断 随机神断`
              );
            } else {
              logger.error("发生错误：", error);
            }
          }

          const newShindan: Shindan = {
            shindanId,
            shindanCommand,
            shindanMode,
            shindanTitle,
          };

          shindans.push(newShindan);

          fs.writeFileSync(
            shindansFilePath,
            JSON.stringify(shindans, null, 2),
            "utf-8"
          );

          return await sendMessage(
            session,
            `神断 '${shindanCommand}' 添加成功。

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`,
            `改名 添加神断 随机`
          );
        }
        //
      }
    );
  // sc*
  ctx
    .command("shindan.删除 <shindanCommand:string>", "删除神断")
    .userFields(["id", "name", "permissions"])
    .action(async function ({ session }, shindanCommand) {
      let { channelId, userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      if (!shindanCommand) {
        return await sendMessage(
          session,
          `请提供有效的 shindanCommand 参数。

指令格式：
删除神断 [shindanCommand]

指令示例：
删除神断 抽老婆`,
          `改名 删除神断 随机神断`
        );
      }
      const index = shindans.findIndex(
        (shindan) => shindan.shindanCommand === shindanCommand
      );

      if (index === -1) {
        return await sendMessage(
          session,
          `神断 '${shindanCommand}' 不存在。`,
          `改名 删除神断 随机神断`
        );
      }

      const shindan = shindans[index];
      const { shindanId, shindanMode } = shindan;

      shindans.splice(index, 1);

      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, "utf-8");

      return await sendMessage(
        session,
        `神断 '${shindanCommand}' 删除成功。

神断ID：${shindanId}
神断指令：${shindanCommand}
神断模式：${shindanMode}`,
        `改名 删除神断 随机神断`
      );
    });
  // xg*
  ctx
    .command(
      "shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]",
      "修改神断"
    )
    .userFields(["id", "name", "permissions"])
    .action(
      async (
        { session },
        shindanCommand,
        shindanNewCommand,
        shindanMode: MakeShindanMode
      ) => {
        let { channelId, userId, username } = session;
        username = await getSessionUserName(session);
        await updateNameInPlayerRecord(session, userId, username);
        if (!shindanCommand || !shindanNewCommand) {
          return await sendMessage(
            session,
            `缺少参数，请提供 shindanCommand shindanNewCommand。

指令格式：
修改神断 [shindanCommand] [shindanNewCommand] [shindanMode]

指令示例：
修改神断 抽老婆 抽妻子 image
        `,
            `改名 修改神断 随机神断`
          );
        }

        if (shindanMode && !isMakeShindanMode(shindanMode)) {
          return await sendMessage(
            session,
            `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`,
            `改名 修改神断 随机神断`
          );
        }

        const shindanIndex = shindans.findIndex(
          (shindan) => shindan.shindanCommand === shindanCommand
        );

        if (shindanIndex === -1) {
          await sendMessage(
            session,
            `'${shindanCommand}' 不存在！`,
            `改名 修改神断 随机神断`
          );
          return;
        }

        const shindan = shindans[shindanIndex];
        shindan.shindanCommand = shindanNewCommand;
        if (shindanMode !== undefined) {
          shindan.shindanMode = shindanMode;
        }
        const updatedContent = JSON.stringify(shindans, null, 2);
        fs.writeFileSync(shindansFilePath, updatedContent, "utf-8");

        await sendMessage(
          session,
          `'${shindanCommand}' 已成功修改为 '${shindanNewCommand}'。

神断ID：${shindan.shindanId}
神断标题：${shindan.shindanTitle}
神断指令：${shindanNewCommand}
神断模式：${shindanMode ? shindanMode : shindan.shindanMode}`,
          `改名 修改神断 随机神断`
        );
      }
    );
  // sz*
  ctx
    .command(
      "shindan.设置 <shindanCommand:string> <shindanMode:string>",
      "设置神断"
    )
    .userFields(["id", "name", "permissions"])
    .action(
      async ({ session }, shindanCommand, shindanMode: MakeShindanMode) => {
        if (!shindanCommand || !shindanMode) {
          return await sendMessage(
            session,
            `缺少参数，请提供 shindanCommand shindanMode

指令格式：
设置神断 [shindanCommand] [shindanMode]

指令示例：
设置神断 卖萌 text`,
            `改名 设置神断 随机神断`
          );
        }
        if (!isMakeShindanMode(shindanMode)) {
          return await sendMessage(
            session,
            `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`,
            `改名 设置神断 随机神断`
          );
        }
        const shindanIndex = shindans.findIndex(
          (shindan) => shindan.shindanCommand === shindanCommand
        );

        if (shindanIndex === -1) {
          await sendMessage(
            session,
            `'${shindanCommand}' 不存在！`,
            `改名 设置神断 随机神断`
          );
          return;
        }

        const shindan = shindans[shindanIndex];
        shindan.shindanMode = shindanMode;
        const updatedContent = JSON.stringify(shindans, null, 2);
        fs.writeFileSync(shindansFilePath, updatedContent, "utf-8");
        return await sendMessage(
          session,
          `设置神断 '${shindanCommand}' 成功。

神断ID：${shindan.shindanId}
神断标题：${shindan.shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`,
          `改名 设置神断 随机神断`
        );
        //
      }
    );
  // zdy**
  ctx
    .command(
      "shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]",
      "自定义神断"
    )
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }, shindanId, shindanName?, shindanMode?) => {
      let { userId, username } = session;
      username = await getSessionUserName(session);
      if (!shindanId) {
        return await sendMessage(
          session,
          `请提供必要的参数 shindanId。

指令格式：
神断 [shindanId] [shindanName] [shindanMode]

指令示例：
神断 1116736 小小学 image`,
          `改名 自定义神断 随机神断`
        );
      }
      if (!isShindanIdValid(shindanId)) {
        return await sendMessage(
          session,
          `shindanId 格式错误，请输入一个有效的 shindanId。`,
          `改名 自定义神断 随机神断`
        );
      }
      if (!shindanName || shindanName === "nawyjxxjywan") {
        shindanName = username;
      }
      if (!shindanMode) {
        shindanMode = "image";
      }
      const userIdRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/g;
      let modifiedShindanName = shindanName;
      let matches: any;

      while ((matches = userIdRegex.exec(shindanName)) !== null) {
        const [, , name] = matches;
        if (name) {
          modifiedShindanName = modifiedShindanName.replace(matches[0], name);
        }
      }

      shindanName = modifiedShindanName;
      if (!isMakeShindanMode(shindanMode)) {
        return await sendMessage(
          session,
          `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`,
          `改名 自定义神断 随机神断`
        );
      }
      const url = `https://${shindanUrl}.com/${shindanId}`;

      const baseHeaders = generateHeaders();

      const getResponse = await retry(() =>
        httpsRequest(url, { headers: baseHeaders })
      );

      const $ = cheerio.load(getResponse.data);

      const cookies = getResponse.headers["set-cookie"] || [];
      const cookieString = cookies.map((c) => c.split(";")[0]).join("; ");

      const xsrfCookie = cookies.find((c) => c.startsWith("XSRF-TOKEN="));
      let xsrfToken = "";
      if (xsrfCookie) {
        const encodedToken = xsrfCookie.split(";")[0].split("=")[1];
        xsrfToken = decodeURIComponent(encodedToken);
      }

      const form = $("form#shindanForm");
      const hiddenToken = form.find('input[name="_token"]').val() ?? "";
      const typeValue = form.find('input[name="type"]').val() ?? "";
      const randnameValue = form.find('input[name="randname"]').val() ?? "";

      const postHeaders = {
        ...baseHeaders,
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookieString,
        Referer: url,
        "X-XSRF-TOKEN": xsrfToken,
      };

      const payloadObject = {
        _token: Array.isArray(hiddenToken)
          ? hiddenToken.join("")
          : hiddenToken ?? "",
        type: Array.isArray(typeValue) ? typeValue.join("") : typeValue ?? "",
        randname: Array.isArray(randnameValue)
          ? randnameValue.join("")
          : randnameValue ?? "",
        user_input_value_1: shindanName ?? "",
      };

      const payload = new URLSearchParams(payloadObject);

      const postResponse = await retry(() =>
        httpsRequest(
          url,
          {
            method: "POST",
            headers: postHeaders,
          },
          payload.toString()
        )
      );

      const $post = cheerio.load(postResponse.data);

      function getShindanTitle($page: cheerio.CheerioAPI): string {
        return (
          $page("h1#shindanResultAbove a.text-decoration-none").text() ?? ""
        );
      }

      function getShindanImageUrl($page: cheerio.CheerioAPI): string | null {
        return (
          $page("div#shindanResultBlock img.shindanResult_image").attr("src") ??
          null
        );
      }

      function getShindanResult($page: cheerio.CheerioAPI): string {
        return $page("span#shindanResult").html() ?? "";
      }

      const shindanTitle = getShindanTitle($post);
      const shindanImageUrl = getShindanImageUrl($post);
      const shindanResult = getShindanResult($post);
      const formattedResult = shindanResult
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<(?:.|\n)*?>/gm, "")
        .replace(/ /g, " ");

      if (shindanMode === "text") {
        return `${shindanTitle}

${formattedResult}
${shindanImageUrl ? h.image(shindanImageUrl) : ""}`;
      } else {
        const titleAndResult = $post("#title_and_result");

        if (!titleAndResult.length) {
          logger.error(
            "无法在页面上找到 'title_and_result' 元素。可能是神断失败。"
          );
          return await sendMessage(
            session,
            "神断失败，无法生成图片。",
            "随机神断"
          );
        }

  function removeShindanEffects(content: cheerio.Cheerio<Element>, type: string) {
          content.find(`span.shindanEffects[data-mode="${type}"]`).each((i, tag) => {
            const $tag = $(tag);
            const $noscript = $tag.next('noscript');
            if ($noscript.length) {
              $noscript.replaceWith($noscript.contents()); // 用 noscript 的内容替换它自己
              $tag.remove(); // 移除原来的效果标签
            }
          });
        }

         removeShindanEffects(titleAndResult, "ef_shuffle");
        removeShindanEffects(titleAndResult, "ef_typing");

        const titleAndResultString = $.html(titleAndResult);

        const scriptTags = $post("script");
        let scriptString = "";

        scriptTags.each((i, el) => {
          const scriptContent = $(el).html();
          if (scriptContent && scriptContent.includes(shindanId)) {
            scriptString = $.html(el); // 获取整个 script 标签的 HTML
            return false; // 相当于 break
          }
        });

        const hasChart = postResponse.data.includes("chart.js");
        const needScript = `${h.unescape(scriptString)}
  <script src="./assets/app.js"
    defer></script>
    <script src="./assets/chartJs.js"
            defer=""></script>`;

        const html = `
  <html lang="en">

  <head>
<link rel="stylesheet" type="text/css" href="./assets/app.css">

      <title>神断渲染页面</title>
  ${hasChart ? h.unescape(needScript) : ""}
  </head>

  <body>
  <div id="main-container">
    <div id="main">
      ${h.unescape(titleAndResultString)}
    </div>
  </div>
  </body>

  </html>`;

        const browser = ctx.puppeteer.browser;
        const page = await browser.newPage();

        const filePath = path
          .join(__dirname, "emptyHtml.html")
          .replace(/\\/g, "/");
        await page.goto("file://" + filePath);
        await page.setViewport({
          width: 750,
          height: 100,
          deviceScaleFactor: 1,
        });
        await page.setContent(html, { waitUntil: "load" });
        hasChart ? await sleep(2000) : "";
        // 找到 title_and_result 元素并截图
        const titleAndResultElement = await page.$("#title_and_result");
        await page.bringToFront();
        const imgBuffer = await titleAndResultElement.screenshot({
          type: imageType,
        });

        await page.close();
        await updateShindanRank(userId, username);
        await sendMessage(
          session,
          h.image(imgBuffer, `image/${imageType}`),
          ``,
          2,
          false
        );
        if (
          isQQOfficialRobotMarkdownTemplateEnabled &&
          session.platform === "qq"
        ) {
          await sendMessage(
            session,
            `🎉 占卜完成！`,
            `神断列表 神断次数排行榜 改名 神断统计 随机神断`
          );
        }
      }

      //
    });

  // gm*
  ctx
    .command("shindan.改名 [newPlayerName:text]", "更改名字")
    .userFields(["id", "name", "permissions"])
    .action(async ({ session }, newPlayerName) => {
      let { userId, username } = session;
      username = await getSessionUserName(session);
      await updateNameInPlayerRecord(session, userId, username);
      newPlayerName = newPlayerName?.trim();
      if (!newPlayerName) {
        return await sendMessage(session, `请输入新的名字。`, `改名 随机神断`);
      }
      if (
        !(
          config.isEnableQQOfficialRobotMarkdownTemplate &&
          session.platform === "qq" &&
          config.key !== "" &&
          config.customTemplateId !== ""
        )
      ) {
        return await sendMessage(
          session,
          `不是 QQ 官方机器人的话，不用改名哦~`,
          `改名 随机神断`
        );
      }
      if (newPlayerName.length > 20) {
        return await sendMessage(
          session,
          `新的名字过长，请重新输入。`,
          `改名 随机神断`
        );
      }
      const players = await ctx.database.get("shindan_rank", {});
      for (const player of players) {
        if (player.username === newPlayerName) {
          return await sendMessage(
            session,
            `新的名字已经存在，请重新输入。`,
            `改名 随机神断`
          );
        }
      }
      if (newPlayerName.includes("@everyone")) {
        return await sendMessage(
          session,
          `【@${username}】\n新的玩家名字不合法，请重新输入。`,
          `改名 随机神断`
        );
      }
      const userRecord = await ctx.database.get("shindan_rank", { userId });
      if (userRecord.length === 0) {
        await ctx.database.create("shindan_rank", {
          userId,
          username: newPlayerName,
        });
      } else {
        await ctx.database.set(
          "shindan_rank",
          { userId },
          { username: newPlayerName }
        );
      }
      return await sendMessage(
        session,
        `名字已更改为：【${newPlayerName}】`,
        `改名 随机神断`,
        2
      );
    });

  // hs*
  /**
   * @description
   * 用户要求使用免费的 SSL 证书。对于客户端请求，除非服务器明确要求客户端证书认证
   * (shindanmaker.com 并无此要求)，否则客户端本身不需要提供证书。
   * 相反，我们配置 TLS 连接选项（如密码套件）来更好地模拟真实浏览器，这有助于通过 Cloudflare 的验证。
   * Node.js 的 https 模块会自动使用其内置的受信任根证书颁发机构(CA)存储来验证服务器证书，确保连接安全。
   * @param urlString 请求的完整 URL
   * @param options https.request 的选项，如 headers
   * @param postData POST 请求的数据体
   * @returns Promise，解析为 { data: 响应体字符串, headers: 响应头对象 }
   */
  async function httpsRequest(
    urlString: string,
    options: https.RequestOptions = {},
    postData?: string
  ): Promise<{ data: string; headers: any }> {
    const url = new URL(urlString);

    const requestOptions: https.RequestOptions = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: postData ? "POST" : "GET",
      headers: options.headers || {},
      // 自定义 TLS 选项以提高兼容性
      ciphers: BROWSER_CIPHERS,
      ...options,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          // 模拟 axios 的行为，在请求失败时抛出带有 response 属性的错误
          if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve({ data: body, headers: res.headers });
          } else {
            const error = new Error(
              `Request Failed. Status Code: ${res.statusCode}`
            );
            (error as any).response = {
              status: res.statusCode,
              headers: res.headers,
              data: body,
            };
            reject(error);
          }
        });
      });

      req.on("error", (e) => {
        reject(e);
      });

      if (postData) {
        req.write(postData);
      }

      req.end();
    });
  }

  async function updateShindanRank(userId: string, username: string) {
    const shindanUser = await ctx.database.get("shindan_rank", { userId });
    if (shindanUser.length === 0) {
      await ctx.database.create("shindan_rank", {
        userId,
        username,
        shindanCount: 1,
      });
    } else {
      // 存在就 + 1
      await ctx.database.set(
        "shindan_rank",
        { userId },
        {
          username,
          shindanCount: shindanUser[0].shindanCount + 1,
        }
      );
    }
  }

  function parseMarkdownCommands(markdownCommands: string): string[] {
    return markdownCommands
      .split(" ")
      .filter((command) => command.trim() !== "");
  }

  async function createButtons(session: any, markdownCommands: string) {
    const commands = parseMarkdownCommands(markdownCommands);

    const mapCommandToDataValue = (command: string) => {
      const commandMappings: Record<string, string> = {
        查看神断: "shindan.查看",
        神断列表: "shindan.列表",
        改名: "shindan.改名",
        神断次数排行榜: "shindan.排行榜",
        删除神断: "shindan.删除",
        设置神断: "shindan.设置",
        随机神断: "shindan.随机",
        添加神断: "shindan.添加",
        神断统计: "shindan.统计",
        修改神断: "shindan.修改",
        自定义神断: "shindan.自定义",
      };

      return commandMappings[command];
    };

    const createButton = async (command: string) => {
      let dataValue = mapCommandToDataValue(command);
      if (dataValue === undefined) {
        dataValue = command;
      }

      return {
        render_data: {
          label: command,
          visited_label: command,
          style: 1,
        },
        action: {
          type: 2,
          permission: { type: 2 },
          data: `${dataValue}`,
          enter: ![
            "改名",
            "查看神断",
            "删除神断",
            "设置神断",
            "添加神断",
            "自定义神断",
          ].includes(command),
        },
      };
    };

    const buttonPromises = commands.map(createButton);
    return Promise.all(buttonPromises);
  }

  let sentMessages = [];
  const msgSeqMap: { [msgId: string]: number } = {};

  async function sendMessage(
    session: any,
    message: any,
    markdownCommands: string,
    numberOfMessageButtonsPerRow?: number,
    isAt: boolean = true,
    isButton: boolean = false
  ): Promise<void> {
    numberOfMessageButtonsPerRow =
      numberOfMessageButtonsPerRow || config.numberOfMessageButtonsPerRow;
    const { bot, channelId, userId } = session;
    const username = await getSessionUserName(session);

    let messageId;
    let isPushMessageId = false;
    if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === "qq") {
      const msgSeq = msgSeqMap[session.messageId] || 10;
      msgSeqMap[session.messageId] = msgSeq + 100;
      const buttons = await createButtons(session, markdownCommands);

      const rows = [];
      let row = { buttons: [] };
      buttons.forEach((button, index) => {
        row.buttons.push(button);
        if (
          row.buttons.length === 5 ||
          index === buttons.length - 1 ||
          row.buttons.length === numberOfMessageButtonsPerRow
        ) {
          rows.push(row);
          row = { buttons: [] };
        }
      });

      if (!isButton && config.isTextToImageConversionEnabled) {
        let lines = message.toString().split("\n");
        const isOnlyImgTag =
          lines.length === 1 && lines[0].trim().startsWith("<img");
        if (isOnlyImgTag) {
          [messageId] = await session.send(message);
        } else {
          if (config.shouldPrefixUsernameInMessageSending && isAt) {
            lines = [`@${username}`, ...lines];
          }
          const modifiedMessage = lines
            .map((line) => {
              if (line.trim() !== "" && !line.includes("<img")) {
                return `# ${line}`;
              } else {
                return line + "\n";
              }
            })
            .join("\n");
          const imageBuffer = await ctx.markdownToImage.convertToImage(
            modifiedMessage
          );
          [messageId] = await session.send(
            h.image(imageBuffer, `image/${config.imageType}`)
          );
        }
        if (config.retractDelay !== 0) {
          isPushMessageId = true;
          sentMessages.push(messageId);
        }

        if (config.isTextToImageConversionEnabled && markdownCommands !== "") {
          await sendMessage(
            session,
            "",
            markdownCommands,
            numberOfMessageButtonsPerRow,
            false,
            true
          );
        }
      } else if (isButton && config.isTextToImageConversionEnabled) {
        const result = await session.qq.sendMessage(session.channelId, {
          msg_type: 2,
          msg_id: session.messageId,
          msg_seq: msgSeq,
          content: "",
          markdown: {
            custom_template_id: config.customTemplateId,
            params: [
              {
                key: config.key,
                values: [`<@${userId}>`],
              },
            ],
          },
          keyboard: {
            content: {
              rows: rows.slice(0, 5),
            },
          },
        });
        messageId = result.id;
      } else {
        if (message.attrs?.src || message.includes("<img")) {
          [messageId] = await session.send(message);
        } else {
          message = message.replace(/\n/g, "\r");
          if (config.shouldPrefixUsernameInMessageSending && isAt) {
            message = `<@${userId}>\r${message}`;
          }
          const result = await session.qq.sendMessage(session.channelId, {
            msg_type: 2,
            msg_id: session.messageId,
            msg_seq: msgSeq,
            content: "111",
            markdown: {
              custom_template_id: config.customTemplateId,
              params: [
                {
                  key: config.key,
                  values: [`${message}`],
                },
              ],
            },
            keyboard: {
              content: {
                rows: rows.slice(0, 5),
              },
            },
          });

          messageId = result.id;
        }
      }
    } else {
      if (config.isTextToImageConversionEnabled) {
        let lines = message.toString().split("\n");
        const isOnlyImgTag =
          lines.length === 1 && lines[0].trim().startsWith("<img");
        if (isOnlyImgTag) {
          [messageId] = await session.send(message);
        } else {
          if (config.shouldPrefixUsernameInMessageSending && isAt) {
            lines = [`@${username}`, ...lines];
          }
          const modifiedMessage = lines
            .map((line) => {
              if (line.trim() !== "" && !line.includes("<img")) {
                return `# ${line}`;
              } else {
                return line + "\n";
              }
            })
            .join("\n");
          const imageBuffer = await ctx.markdownToImage.convertToImage(
            modifiedMessage
          );
          [messageId] = await session.send(
            h.image(imageBuffer, `image/${config.imageType}`)
          );
        }
      } else {
        if (config.shouldPrefixUsernameInMessageSending && isAt) {
          message = `@${username}\n${message}`;
        }
        [messageId] = await session.send(message);
      }
    }

    if (config.retractDelay === 0) return;
    if (!isPushMessageId) {
      sentMessages.push(messageId);
    }

    if (sentMessages.length > 1) {
      const oldestMessageId = sentMessages.shift();
      setTimeout(async () => {
        await bot.deleteMessage(channelId, oldestMessageId);
      }, config.retractDelay * 1000);
    }
  }

  async function updateNameInPlayerRecord(
    session: any,
    userId: string,
    username: string
  ): Promise<void> {
    const userRecord = await ctx.database.get("shindan_rank", { userId });

    if (userRecord.length === 0) {
      await ctx.database.create("shindan_rank", {
        userId,
        username,
      });
      return;
    }

    const existingRecord = userRecord[0];
    let isChange = false;

    if (
      username !== existingRecord.username &&
      !(isQQOfficialRobotMarkdownTemplateEnabled && session.platform === "qq")
    ) {
      existingRecord.username = username;
      isChange = true;
    }

    if (isChange) {
      await ctx.database.set(
        "shindan_rank",
        { userId },
        {
          username: existingRecord.username,
        }
      );
    }
  }

  async function getSessionUserName(session: any): Promise<string> {
    let sessionUserName = session.user.name || session.username;

    if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === "qq") {
      let userRecord = await ctx.database.get("shindan_rank", {
        userId: session.userId,
      });

      if (userRecord.length === 0) {
        await ctx.database.create("shindan_rank", {
          userId: session.userId,
          username: sessionUserName,
        });

        userRecord = await ctx.database.get("shindan_rank", {
          userId: session.userId,
        });
      }

      sessionUserName = session.user.name || userRecord[0].username;
    }

    return sessionUserName;
  }

  async function processTargetUser(
    session: any,
    userId: string,
    username: string,
    targetUser: string
  ): Promise<{
    targetUserRecord: ShindanRank[];
    targetUserId: string;
  }> {
    let targetUserRecord = [];
    let targetUserId: string = userId;
    let targetUsername = username;

    if (!targetUser) {
      targetUserRecord = await ctx.database.get("shindan_rank", { userId });
    } else {
      targetUser = await replaceAtTags(session, targetUser);

      if (
        isQQOfficialRobotMarkdownTemplateEnabled &&
        session.platform === "qq"
      ) {
        targetUserRecord = await ctx.database.get("shindan_rank", {
          username: targetUser,
        });

        if (targetUserRecord.length === 0) {
          targetUserRecord = await ctx.database.get("shindan_rank", {
            userId: targetUser,
          });

          if (targetUserRecord.length !== 0) {
            targetUserId = targetUser;
          }
        } else {
          targetUserId = targetUserRecord[0].userId;
        }
      } else {
        const userIdRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/;
        const match = targetUser.match(userIdRegex);
        targetUserId = match?.[1] ?? userId;
        targetUsername = match?.[2] ?? username;

        if (targetUserId === userId) {
          targetUserRecord = await ctx.database.get("shindan_rank", {
            userId: targetUser,
          });

          if (targetUserRecord.length !== 0) {
            targetUserId = targetUser;
          }
        } else {
          targetUserRecord = await ctx.database.get("shindan_rank", {
            userId: targetUserId,
          });
        }
      }
    }

    return { targetUserRecord, targetUserId };
  }

  async function replaceAtTags(session, content: string): Promise<string> {
    const atRegex = /<at id="(\d+)"(?: name="([^"]*)")?\/>/g;

    let match;
    while ((match = atRegex.exec(content)) !== null) {
      const userId = match[1];
      const name = match[2];

      if (!name) {
        if (
          isQQOfficialRobotMarkdownTemplateEnabled &&
          session.platform === "qq"
        ) {
          const newAtTag = `<at id="${userId}" name="请在神断指令后面加上你的名字吧~ 例如：我爱你 小小神尊"/>`;
          content = content.replace(match[0], newAtTag);
        } else {
          let guildMember;
          try {
            guildMember = await session.bot.getGuildMember(
              session.guildId,
              userId
            );
          } catch (error) {
            guildMember = {
              user: {
                name: "未知用户",
              },
            };
          }

          const newAtTag = `<at id="${userId}" name="${guildMember.user.name}"/>`;
          content = content.replace(match[0], newAtTag);
        }
      }
    }

    return content;
  }

  function isShindanIdValid(shindanId: string): boolean {
    return !isNaN(Number(shindanId));
  }

  function isMakeShindanMode(
    shindanMode: unknown
  ): shindanMode is MakeShindanMode {
    return shindanMode === "image" || shindanMode === "text";
  }

  function randomBrowserVersion(): string {
    const buffer = crypto.randomBytes(2);

    const number = buffer.readUInt16BE();

    const major = number >> 8;
    const minor = number & 0xff;

    return `${major}.${minor}.0.0`;
  }

  function randomUserAgent(): string {
    const base =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)";

    const chrome = `Chrome/${randomBrowserVersion()}`;

    const edge = `Edg/${randomBrowserVersion()}`;

    return `${base} ${chrome} Safari/537.36 ${edge}`;
  }

  function generateHeaders() {
    const userAgent = randomUserAgent();

    return {
      "User-Agent": userAgent,
    };
  }

  async function getShindanTitle(shindanId: string): Promise<string> {
    const url = `https://${shindanUrl}.com/${shindanId}`;
    const headers = generateHeaders();

    const response = await retry(() => ctx.http.get(url, { headers }));

    const $ = cheerio.load(response.data);

    const shindanTitleElement = $("#shindanTitle");

    if (shindanTitleElement.length) {
      return shindanTitleElement.text() || "";
    } else {
      throw new Error("无法找到 shindanTitle。");
    }
  }

  async function retry<T>(
    func: () => Promise<T>,
    retries = maxRetryCount,
    delay = 500
  ): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < retries; i++) {
      try {
        return await func();
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, delay * 2 ** i));
      }
    }
    throw lastError;
  }
}
