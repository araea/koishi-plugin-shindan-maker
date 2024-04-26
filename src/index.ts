import {Context, h, Logger, noop, Schema, sleep} from 'koishi'
import {} from 'koishi-plugin-markdown-to-image-service'
import {} from 'koishi-plugin-puppeteer'

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';
import {JSDOM} from 'jsdom';

export const inject = {
  required: ['database', 'puppeteer'],
  optional: ['markdownToImage'],
}
export const name = 'shindan-maker'
export const usage = `## 🎮 使用

- 启动 Koishi，并确保你已经启动了 [puppeteer](https://koishi.chat/guide/plugins/puppeteer.html) 服务。
- 发送 \`shindan\` 指令，查看神断帮助信息。
- 发送 \`shindan.列表\` 指令，查看已有的神断列表。
- 发送神断列表中的任意一个神断指令，如 \`抽老婆\`，即可生成对应的神断结果。
- 你也可以使用 \`shindan.随机\` 指令，随机抽取一个神断。
- 你还可以使用 \`shindan.自定义\` 指令，输入一个神断网上的神断 ID，自定义生成一个神断结果。
- 你可以使用 \`-t\` 或 \`-i\` 参数，指定生成的神断结果是文本模式还是图片模式。
- 你可以使用 \`shindan.添加\`，\`shindan.删除\`，\`shindan.修改\` 和 \`shindan.设置\` 指令，管理你的神断列表。

## 📝 神断命令

### 查看信息
- \`shindan\`：查看神断帮助信息。
- \`shindan.列表 [batchCount:number]\`：查看神断列表，可指定批次数和每批显示的神断数量（默认为 \`5\`）。

### 神断操作
- \`shindan.查看 [shindanCommand:text]\`：根据神断指令查看神断信息。
- \`shindan.排行榜 [number:number]\`：查看神断次数排行榜，number 参数为排行榜显示人数，默认为 \`20\`。
- \`shindan.统计 [targetUser:text]\`：查看指定用户的神断统计信息。
- \`shindan.随机 [shindanName:text]\`：随机抽取一个神断，可指定神断名，若不指定则使用用户名（默认为 \`text\` 模式）。
- \`shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]\`：自定义生成一个神断结果，需指定神断 ID，可指定神断名，若不指定则使用用户名，可指定神断模式（默认为 \`image\` 模式）。

### 神断管理
- \`shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]\`：添加一个神断到列表中，需指定神断 ID、神断指令和神断模式（默认为 \`image\` 模式）。
- \`shindan.删除 <shindanCommand:string>\`：删除列表中的一个神断，需指定神断指令。
- \`shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]\`：修改列表中的一个神断，需指定原神断指令、新神断指令和神断模式（默认为原神断模式）。
- \`shindan.设置 <shindanCommand:string> <shindanMode:string>\`：设置列表中的一个神断的模式，需指定神断指令和神断模式。

## 🐱 QQ 群

- 956758505
`
const logger = new Logger(`shindanMaker`)

// pz* pzx*
export interface Config {
  shindanUrl: string
  maxRetryCount: number
  defaultMaxDisplayCount: number
  defaultShindansBatchCount: number

  key: string
  retractDelay: number
  customTemplateId: string
  imageType: "png" | "jpeg" | "webp"
  isTextToImageConversionEnabled: boolean
  shouldPrefixUsernameInMessageSending: boolean
  isEnableQQOfficialRobotMarkdownTemplate: boolean

  numberOfMessageButtonsPerRow: number
  isRandomDivineCommandVisible: boolean
  shouldMiddlewareInterruptAfterDivineDirective: boolean
  isOfficialShindanSyncEnabled: boolean
}

// config
export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    isOfficialShindanSyncEnabled: Schema.boolean().default(true).description(`是否与插件内置神断保持同步，关闭后，将不会再为你新增任何神断，默认为 \`true\`。`),

  }).description('神断同步设置'),
  Schema.object({
    shindanUrl: Schema.string().default('en.shindanmaker').description(`神断 url，可选前缀有：en, kr, cn, th, 无前缀（en 没被墙）。`),

  }).description('神断网 URL'),
  Schema.object({
    maxRetryCount: Schema.number().min(1).default(3).description(`最大重试次数。`),

  }).description('请求设置'),
  Schema.object({
    imageType: Schema.union(['png', 'jpeg', 'webp']).default('png').description(`图片类型。`),
    shouldPrefixUsernameInMessageSending: Schema.boolean().default(true).description(`是否在发送消息时加上 @用户名。`),
    retractDelay: Schema.number().min(0).default(0).description(`自动撤回等待的时间，单位是秒。值为 0 时不启用自动撤回功能。`),
    isTextToImageConversionEnabled: Schema.boolean().default(false).description(`是否开启将文本转为图片的功能（可选），如需启用，需要启用 \`markdownToImage\` 服务。`),
    isEnableQQOfficialRobotMarkdownTemplate: Schema.boolean().default(false).description(`是否启用 QQ 官方机器人的 Markdown 模板，带消息按钮。`),
  }).description('消息发送设置'),
  Schema.union([
    Schema.object({
      isEnableQQOfficialRobotMarkdownTemplate: Schema.const(true).required(),
      customTemplateId: Schema.string().default('').description(`自定义模板 ID。`),
      key: Schema.string().default('').description(`文本内容中特定插值的 key，用于存放文本。如果你的插值为 {{.info}}，那么请在这里填 info。`),
      numberOfMessageButtonsPerRow: Schema.number().min(2).max(5).default(2).description(`每行消息按钮的数量。`),
    }),
    Schema.object({}),
  ]),

  Schema.object({
    isRandomDivineCommandVisible: Schema.boolean().default(true).description(`随机神断的时候是否显示神断指令名，默认为 \`true\`。`),

  }).description('随机神断设置'),
  Schema.object({
    defaultMaxDisplayCount: Schema.number().min(0).default(20).description(`排行榜默认显示的人数，默认值为 \`20\`。`),

  }).description('排行榜设置'),
  Schema.object({
    defaultShindansBatchCount: Schema.number().min(1).max(10).default(4).description(`（QQ官方机器人请调整至4及以下）发送神断列表默认的批次数，最大值为 \`10\`，默认为 \`4\`。`),

  }).description('神断列表设置'),
  Schema.object({
    shouldMiddlewareInterruptAfterDivineDirective: Schema.boolean().default(true).description(`中间件是否在获取神断指令之后中断，默认为 \`true\`。`),

  }).description('中间件设置'),
]) as any

type MakeShindanMode = "image" | "text";

// smb*
declare module 'koishi' {
  interface Tables {
    shindan_rank: ShindanRank
  }
}

// jk*
export interface ShindanRank {
  id: number
  channelId: string
  userId: string
  username: string
  shindanCount: number
}

// zhs*
export async function apply(ctx: Context, config: Config) {
  // tzb*
  ctx.model.extend('shindan_rank', {
    id: 'unsigned',
    channelId: 'string',
    userId: 'string',
    username: 'string',
    shindanCount: 'integer'
  }, {primary: 'id', autoInc: true})

  // cl*
  const {
    shindanUrl, maxRetryCount, imageType, defaultMaxDisplayCount, isRandomDivineCommandVisible,
    shouldMiddlewareInterruptAfterDivineDirective, isOfficialShindanSyncEnabled, defaultShindansBatchCount
  } = config

  const isQQOfficialRobotMarkdownTemplateEnabled = config.isEnableQQOfficialRobotMarkdownTemplate && config.key !== '' && config.customTemplateId !== ''

  interface Shindan {
    shindanId: string;
    shindanCommand: string;
    shindanMode: string;
    shindanTitle: string;
  }

  // 检查文件/文件夹是否存在，如果不存在则创建
  async function ensureDirExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {recursive: true});
    }
  }

  // 读取 JSON 文件
  async function readJSONFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  // 写入 JSON 文件
  async function writeJSONFile(filePath: string, data: any) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
  }

  // 主要逻辑
  const filePath = path.join(__dirname, 'assets', 'shindans.json');
  const shindansDirPath = path.join(ctx.baseDir, 'data', 'shindanMaker');
  const shindansFilePath = path.join(shindansDirPath, 'shindans.json');

  await ensureDirExists(shindansDirPath);

  // 判断文件是否存在，如果不存在则创建
  async function ensureFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
  }

  await ensureFileExists(shindansFilePath);

  async function handleOfficialShindanSync() {
    if (isOfficialShindanSyncEnabled) {
      // 这里处理为用户新增神断的功能

      // 读取文件中的数据
      const shindansData = await readJSONFile(filePath);
      let targetShindansData = await readJSONFile(shindansFilePath);

      // 查找缺失的 shindanId
      const missingShindans = shindansData.filter((shindan: any) => {
        return !targetShindansData.some((targetShindan: any) => targetShindan.shindanId === shindan.shindanId);
      });

      // 将缺失的 shindan 对象添加到目标文件中
      targetShindansData = targetShindansData.concat(missingShindans);
      await writeJSONFile(shindansFilePath, targetShindansData);

      // 如果 missingShindans 数组不为空，则打印添加的 shindan 对象
      if (missingShindans.length > 0) {
        logger.success('添加的 shindan 对象：', missingShindans);
      }
    }
  }

  await handleOfficialShindanSync();

  const fileContent = await fs.promises.readFile(shindansFilePath, 'utf-8');
  const shindans: Shindan[] = JSON.parse(fileContent);
  shindans.sort((a, b) => a.shindanCommand.localeCompare(b.shindanCommand));

  // zjj*
  ctx.middleware(async (session, next) => {
    const {username, content} = session
    let isText = false;
    let isImage = false;
    let modifiedContent = content;
    if (content.includes('-t')) {
      isText = true;
      modifiedContent = content.replace('-t', '');
    } else if (content.includes('-i')) {
      isImage = true;
      modifiedContent = content.replace('-i', '');
    }

    async function extractCommandAndShindanName(content: string): Promise<{ command: string; shindanName: string }> {
      content = await replaceAtTags(session, content)

      // 匹配 <at> 标签的正则表达式
      const atTagRegex = /<at id=['"][^'"]+['"](?: name=['"][^'"]+['"])?\/>/g;

      // 删除开始的 <at> 标签
      const frontAtTagRegex = /^<at id=['"][^'"]+['"](?: name=['"][^'"]+['"])?\/>\s*/;
      content = content.replace(frontAtTagRegex, '');

      // 使用正则表达式找到所有的 <at> 标签
      const atTags = content.match(atTagRegex);

      // 移除所有的 <at> 标签得到可能的命令和shindanName
      let commandAndShindan = content.replace(atTagRegex, '').trim();

      // 分割可能的命令和shindanName
      let splitIndex = commandAndShindan.indexOf(' ');
      let command = commandAndShindan;
      let shindanName = '';

      // 如果存在空格，则分割命令和shindanName
      if (splitIndex !== -1) {
        command = commandAndShindan.substring(0, splitIndex);
        shindanName = commandAndShindan.substring(splitIndex + 1).trim();
      }

      // 如果存在 <at> 标签，则 shindanName 为这些标签加上之前分割的shindanName（如果有的话）
      shindanName = (atTags ? atTags.join(' ') : '') + (shindanName ? ' ' + shindanName : '');

      if (!shindanName) {
        shindanName = username
      }

      return {command, shindanName};
    }

    const result = await extractCommandAndShindanName(modifiedContent)

    const {command, shindanName} = result
    const shindan = shindans.find(s => s.shindanCommand === command);

    if (shindan) {
      let {shindanId, shindanMode} = shindan
      if (isText) {
        shindanMode = 'text'
      } else if (isImage) {
        shindanMode = 'image'
      }
      await session.execute(`shindan.自定义 ${shindanId} '${shindanName}' ${shindanMode}`)
      return shouldMiddlewareInterruptAfterDivineDirective ? noop() : await next();
    } else {
      await next()
    }
  })

  // h* bz*
  ctx.command('shindan', '查看神断帮助')
    .usage(`神断资源：${shindanUrl}.com。`)
    .action(async ({session}) => {
      //
      if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === 'qq') {
        return await sendMessage(session, `🔮 《神断占卜器》 🔮
😆 欢迎游玩~ 祝您玩得开心！`, `神断列表 神断次数排行榜 改名 神断统计 随机神断`, 2, false)
      }
      await session.execute(`shindan -h`)
      //
    })
  //tj*
  ctx.command('shindan.统计 [targetUser:text]', '查看统计信息')
    .action(async ({session}, targetUser) => {
      //
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      const result = await processTargetUser(session, userId, username, targetUser)
      const targetUserRecord: ShindanRank[] = result.targetUserRecord;
      const targetUserId: string = result.targetUserId;
      if (targetUserRecord.length === 0) {
        return await sendMessage(session, `该统计对象无神断记录。`, `改名 神断统计 随机神断`)
      }
      const guildUsers = await ctx.database.get('shindan_rank', {channelId})
      // 根据 shindanCount 降序排序
      guildUsers.sort((a, b) => b.shindanCount - a.shindanCount);

      // 获取指定 userId 的排名信息
      const userIndex = guildUsers.findIndex(user => user.userId === userId);
      const userRank = userIndex === -1 ? undefined : userIndex + 1; // 用户排名，第一名是1，没有找到用户则为 undefined

      return await sendMessage(session, `统计对象：${targetUserRecord[0].username}

神断次数：${targetUserRecord[0].shindanCount} 次。
排名：第 ${userRank} 名。`, `改名 神断统计 随机神断`)

      //
    })
  // phb* r*
  ctx.command('shindan.排行榜 [number:number]', '神断次数排行榜')
    .action(async ({session}, number: number) => {
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      const maxNumber = number || defaultMaxDisplayCount; // 获取参数中的最大人数，如果没有提供参数，则默认为 defaultMaxDisplayCount

      if (typeof maxNumber !== 'number' || maxNumber <= 0) {
        return await sendMessage(session, `参数 number 必须为正整数！`, `改名 神断次数排行榜 随机神断`);
      }

      const shindanUsers = await ctx.database.get('shindan_rank', {});

      shindanUsers.sort((a, b) => b.shindanCount - a.shindanCount);

      const limitedUsers = shindanUsers.slice(0, maxNumber); // 仅保留排行榜中的前 maxNumber 个用户

      const rankStrings: string[] = limitedUsers.map((user, index: number) => `${index + 1}. ${user.username}：${user.shindanCount} 次`);

      return await sendMessage(session, `神断次数排行榜：\n\n${rankStrings.join('\n')}`, `改名 神断次数排行榜 随机神断`);
    });

  // ck*
  ctx.command('shindan.查看 <shindanCommand:text>', '查看神断')
    .action(async ({session}, shindanCommand) => {
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      // 查看：
      if (!shindanCommand) {
        return await sendMessage(session, `请提供必要参数 shindanCommand。

指令格式：
查看神断 [shindanCommand]

指令示例：
查看神断 今天是什么少女`, `改名 查看神断 随机神断`)
      }
      const existingShindan = shindans.find((shindan) => shindan.shindanCommand === shindanCommand);
      if (!existingShindan) {
        return await sendMessage(session, `指定神断不存在。`, `改名 查看神断 随机神断`)
      }
      const {shindanId, shindanMode, shindanTitle} = existingShindan
      return await sendMessage(session, `神断 '${shindanCommand}' 信息如下：

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`, `改名 查看神断 随机神断`)
      //
    })
  // sj*
  ctx.command('shindan.随机 [shindanName:text]', '随机神断')
    .option('text', '-t 文本模式')
    .option('image', '-i 图片模式')
    .action(async ({session, options}, shindanName) => {
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      //
      if (!shindanName) {
        shindanName = username
      }
      shindanName = await replaceAtTags(session, shindanName)
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
      let {shindanId, shindanMode, shindanCommand} = randomShindan;
      if (options.text) {
        shindanMode = 'text'
      } else if (options.image) {
        shindanMode = 'image'
      }
      isRandomDivineCommandVisible ? await await sendMessage(session, `神断指令：${shindanCommand}`, ``) : noop()
      await session.execute(`shindan.自定义 ${shindanId} '${shindanName}' ${shindanMode}`)
      //
    })
  // lb*
  ctx.command('shindan.列表 [batchCount:number]', '神断列表').action(async ({session}, batchCount = defaultShindansBatchCount) => {
    let {channelId, userId, username} = session
    username = await getSessionUserName(session)
    await updateNameInPlayerRecord(session, userId, username)
    if (isNaN(batchCount) || batchCount <= 0) {
      return await sendMessage(session, `批次数必须是一个大于 0 的数字！`, `改名 神断列表 随机神断`)
    }
    if (batchCount > 10) return await sendMessage(session, `批次数超出范围，最大值为 10。`, `改名 神断列表 随机神断`)
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
                ${rows.join('\n')}
              </table>
            </div>
          </body>
        </html>
      `;
    };

    const browser = ctx.puppeteer.browser
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    await page.setViewport({width: 100, height: 100});

    for (let i = 1; i <= totalShindans; i++) {
      const shindan = shindans[i - 1];
      const row = `
        <tr>
          <td>
            <div class="line1">
              <div class="id">${shindan.shindanId}</div>
              <div class="command">${serialNumber++}. ${shindan.shindanCommand}</div>
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
        await page.setContent(html, {waitUntil: 'load'});
        const imgBuffer = await page.screenshot({fullPage: true, type: imageType});
        await sendMessage(session, h.image(imgBuffer, `image/${imageType}`), ``, 2, false);
        tableRows = [];
      }
    }

    await page.close();
    await context.close();
  });

  // tj*
  ctx.command('shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]', '添加神断')
    .action(async ({session}, shindanId, shindanCommand, shindanMode: MakeShindanMode = 'image') => {
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      // 检查参数 神断是否已经存在 神断是否有效
      if (!shindanId || !shindanCommand) {
        await sendMessage(session, `参数缺失，请提供 shindanId 或 shindanCommand。

指令格式：
添加神断 [shindanId] [shindanCommand] [shindanMode]

使用示例：
添加神断 1116736 OC生成器 image
添加神断 1116736 OC生成器 text`, `改名 添加神断 随机神断`);
        return;
      }
      if (!isShindanIdValid(shindanId)) {
        return await sendMessage(session, `shindanId 格式错误，请输入一个有效的 shindanId。`, `改名 添加神断 随机神断`)
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(shindanMode)) {
        return await sendMessage(session, `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`, `改名 添加神断 随机神断`)
      }

      // 根据 shindanCommand 检查 shindans 中是否已存在该 shindanCommand
      const existingShindanCommand = shindans.find((shindan) => shindan.shindanCommand === shindanCommand);

      if (existingShindanCommand) {
        return await sendMessage(session, `添加失败：神断指令 '${shindanCommand}' 重复。`, `改名 添加神断 随机神断`);
      }

      // 根据 shindanId 检查 shindans 中是否已存在该 shindanId
      const existingShindan = shindans.find((shindan) => shindan.shindanId === shindanId);

      if (existingShindan) {
        // 获取该 shindan 的 shindanCommand 和 shindanMode
        const {shindanCommand, shindanTitle, shindanMode} = existingShindan;
        return await sendMessage(session, `神断 '${shindanId}' 已存在。

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`, `改名 添加神断 随机神断`)
      } else {
        let shindanTitle: string
        try {
          shindanTitle = await getShindanTitle(shindanId);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            return await sendMessage(session, `添加失败：该 shindanId 页面 404。`, `改名 添加神断 随机神断`)
          } else {
            logger.error('发生错误：', error);
          }
        }

        const newShindan: Shindan = {
          shindanId,
          shindanCommand,
          shindanMode,
          shindanTitle,
        };

        shindans.push(newShindan);

        fs.writeFileSync(shindansFilePath, JSON.stringify(shindans, null, 2), 'utf-8');

        return await sendMessage(session, `神断 '${shindanCommand}' 添加成功。

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`, `改名 添加神断 随机`)
      }
      //
    });
  // sc*
  ctx.command('shindan.删除 <shindanCommand:string>', '删除神断')
    .action(async function ({session}, shindanCommand) {
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      // 删除：检查参数 查找神断是否存在
      if (!shindanCommand) {
        return await sendMessage(session, `请提供有效的 shindanCommand 参数。

指令格式：
删除神断 [shindanCommand]

指令示例：
删除神断 抽老婆`, `改名 删除神断 随机神断`);
      }
      const index = shindans.findIndex((shindan) => shindan.shindanCommand === shindanCommand);

      if (index === -1) {
        return await sendMessage(session, `神断 '${shindanCommand}' 不存在。`, `改名 删除神断 随机神断`);
      }

      const shindan = shindans[index]; // 获取需要删除的 shindan 对象
      const {shindanId, shindanMode} = shindan; // 提取 shindanId 和 shindanMode

      shindans.splice(index, 1);

      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, 'utf-8');

      return await sendMessage(session, `神断 '${shindanCommand}' 删除成功。

神断ID：${shindanId}
神断指令：${shindanCommand}
神断模式：${shindanMode}`, `改名 删除神断 随机神断`);
    });
  // xg*
  ctx.command('shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]', '修改神断')
    .action(async ({session}, shindanCommand, shindanNewCommand, shindanMode: MakeShindanMode) => {
      let {channelId, userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      // 修改：检查参数 shindanMode 直接可以改 因为只是改指令名或模式
      if (!shindanCommand || !shindanNewCommand) {
        return await sendMessage(session, `缺少参数，请提供 shindanCommand shindanNewCommand。

指令格式：
修改神断 [shindanCommand] [shindanNewCommand] [shindanMode]

指令示例：
修改神断 抽老婆 抽妻子 image
        `, `改名 修改神断 随机神断`)
      }

      // 判断 mode 是否为 MakeShindanMode 类型
      if (shindanMode && !isMakeShindanMode(shindanMode)) {
        return await sendMessage(session, `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`, `改名 修改神断 随机神断`
        )
      }

      const shindanIndex = shindans.findIndex((shindan) => shindan.shindanCommand === shindanCommand);

      if (shindanIndex === -1) {
        await await sendMessage(session, `'${shindanCommand}' 不存在！`, `改名 修改神断 随机神断`);
        return;
      }

      const shindan = shindans[shindanIndex];
      shindan.shindanCommand = shindanNewCommand;
      if (shindanMode !== undefined) {
        shindan.shindanMode = shindanMode;
      }
      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, 'utf-8');

      await await sendMessage(session, `'${shindanCommand}' 已成功修改为 '${shindanNewCommand}'。

神断ID：${shindan.shindanId}
神断标题：${shindan.shindanTitle}
神断指令：${shindanNewCommand}
神断模式：${(shindanMode ? shindanMode : shindan.shindanMode)}`, `改名 修改神断 随机神断`);

    });
  // sz*
  ctx.command('shindan.设置 <shindanCommand:string> <shindanMode:string>', '设置神断')
    .action(async ({session}, shindanCommand, shindanMode: MakeShindanMode) => {
      // 设置：检查参数 检查 shindanMode 更改 shindans 记录
      if (!shindanCommand || !shindanMode) {
        return await sendMessage(session, `缺少参数，请提供 shindanCommand shindanMode

指令格式：
设置神断 [shindanCommand] [shindanMode]

指令示例：
设置神断 卖萌 text`, `改名 设置神断 随机神断`)
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(shindanMode)) {
        return await sendMessage(session, `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`, `改名 设置神断 随机神断`)
      }
      const shindanIndex = shindans.findIndex((shindan) => shindan.shindanCommand === shindanCommand);

      if (shindanIndex === -1) {
        await await sendMessage(session, `'${shindanCommand}' 不存在！`, `改名 设置神断 随机神断`);
        return;
      }

      const shindan = shindans[shindanIndex];
      shindan.shindanMode = shindanMode;
      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, 'utf-8');
      return await sendMessage(session, `设置神断 '${shindanCommand}' 成功。

神断ID：${shindan.shindanId}
神断标题：${shindan.shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`, `改名 设置神断 随机神断`)
      //
    })
  // zdy**
  ctx.command('shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]', '自定义神断')
    .action(async ({session}, shindanId, shindanName?, shindanMode?) => {
      // 检查shindanId shindanMode
      const {channelId, userId, username} = session
      if (!shindanId) {
        return await sendMessage(session, `请提供必要的参数 shindanId。

指令格式：
神断 [shindanId] [shindanName] [shindanMode]

指令示例：
神断 1116736 小小学 image`, `改名 自定义神断 随机神断`)
      }
      if (!isShindanIdValid(shindanId)) {
        return await sendMessage(session, `shindanId 格式错误，请输入一个有效的 shindanId。`, `改名 自定义神断 随机神断`)
      }
      if (!shindanName) {
        shindanName = username
      }
      if (!shindanMode) {
        shindanMode = 'image'
      }
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
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(shindanMode)) {
        return await sendMessage(session, `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`, `改名 自定义神断 随机神断`)
      }
      const url = `https://${shindanUrl}.com/${shindanId}`;

      const headers = generateHeaders()

      const response = await retry(() => axios.get(url, {headers}))

      const dom = new JSDOM(response.data);

      const cookies = response.headers['set-cookie'];
      const sessionCookie = cookies.find((cookie: string) => cookie.startsWith('_session='));
      const sessionValue = sessionCookie.split('=')[1].split(';')[0];

      const form = dom.window.document.querySelector<HTMLFormElement>('form#shindanForm');

      const tokenInput = form.querySelector<HTMLInputElement>('input[name="_token"]');
      const tokenValue = tokenInput.value;

      const hiddenNameInput = form.querySelector<HTMLInputElement>('input[name="hiddenName"]');
      const hiddenNameValue = hiddenNameInput.value;

      const typeInput = form.querySelector<HTMLInputElement>('input[name="type"]');
      const typeValue = typeInput.value;

      const shindanTokenInput = form.querySelector<HTMLInputElement>('input[name="shindan_token"]');
      const shindanTokenValue = shindanTokenInput.value;

      const payload = new URLSearchParams();
      payload.append('_token', tokenValue);
      payload.append('hiddenName', hiddenNameValue);
      payload.append('type', typeValue);
      payload.append('shindanName', shindanName);
      payload.append('shindan_token', shindanTokenValue);

      const postResponse = await retry(() => axios.post(url, payload.toString(), {
        headers: {
          ...headers,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': `_session=${sessionValue};`,
        },
      }));

      const postDom = new JSDOM(postResponse.data);

      function getShindanTitle(postDom: Document): string {
        const shindanTitleElement = postDom.querySelector<HTMLAnchorElement>('h1#shindanResultAbove a.text-decoration-none');
        return shindanTitleElement ? shindanTitleElement.textContent ?? '' : '';
      }

      function getShindanImageUrl(postDom: Document): string | null {
        const shindanImageElement = postDom.querySelector<HTMLImageElement>('div#shindanResultBlock img.shindanResult_image');
        return shindanImageElement ? shindanImageElement.src : null;
      }

      function getShindanResult(postDom: Document): string {
        const shindanResultElement = postDom.querySelector<HTMLSpanElement>('span#shindanResult');
        return shindanResultElement ? shindanResultElement.innerHTML : '';
      }

      const shindanTitle = getShindanTitle(postDom.window.document);
      const shindanImageUrl = getShindanImageUrl(postDom.window.document);
      const shindanResult = getShindanResult(postDom.window.document);
      const formattedResult = shindanResult
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&nbsp;/g, ' ');

      if (shindanMode === 'text') {
        return `${shindanTitle}

${formattedResult}
${(shindanImageUrl) ? h.image(shindanImageUrl) : ''}`
      } else {
        // shindanMode = 'image'
        const titleAndResult = postDom.window.document.getElementById('title_and_result');

        function removeShindanEffects(content: Element, type: string) {
          const tags = content.querySelectorAll(`span.shindanEffects[data-mode="${type}"]`);
          tags.forEach((tag) => {
            const noscript = tag.nextElementSibling;
            if (noscript) {
              replaceWithChildren(noscript);
              tag.remove();
            }
          });
        }

        function replaceWithChildren(node: Node) {
          const parent = node.parentNode;
          if (parent) {
            while (node.firstChild) {
              parent.insertBefore(node.firstChild, node);
            }
            parent.removeChild(node);
          }
        }

        removeShindanEffects(titleAndResult, "ef_shuffle");
        removeShindanEffects(titleAndResult, "ef_typing");
        const titleAndResultString = titleAndResult.outerHTML;

        // 在 postDom 中寻找第一个包含 shindanId 的 <script> 标签
        const scriptTags = postDom.window.document.getElementsByTagName('script');
        let scriptString = '';

        for (let i = 0; i < scriptTags.length; i++) {
          if (scriptTags[i].textContent.includes(shindanId)) {
            scriptString = scriptTags[i].outerHTML;
            break;
          }
        }
        const hasChart = postResponse.data.includes("chart.js");
        const needScript = `${h.unescape(scriptString)}
  <script src="./assets/app.js"
    defer></script>
    <script src="./assets/chartJs.js"
            defer=""></script>`

        const html = `
  <html lang="en">

  <head>
<link rel="stylesheet" type="text/css" href="./assets/app.css">

      <title>神断渲染页面</title>
  ${hasChart ? h.unescape(needScript) : ''}
  </head>

  <body>
  <div id="main-container">
    <div id="main"> <span id="shindan_after" class="d-none">default</span>
     ${h.unescape(titleAndResultString)}
    </div>
  </div>
  </body>

  </html>`

        const browser = ctx.puppeteer.browser
        const context = await browser.createBrowserContext()
        const page = await context.newPage()
        const filePath = path.join(__dirname, 'emptyHtml.html').replace(/\\/g, '/');
        await page.goto('file://' + filePath);
        await page.setViewport({
          width: 750, height: 100, deviceScaleFactor: 1
        });
        await page.setContent(html, {waitUntil: 'load'});
        hasChart ? await sleep(2000) : '';
        // 找到 title_and_result 元素并截图
        const titleAndResultElement = await page.$('#title_and_result');
        const imgBuffer = await titleAndResultElement.screenshot({type: imageType});

        await page.close();
        await context.close();
        await updateShindanRank(channelId, userId, username)
        await sendMessage(session, h.image(imgBuffer, `image/${imageType}`), ``, 2, false)
        if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === 'qq') {
          await sendMessage(session, `🎉 占卜完成！`, `神断列表 神断排行榜 改名 神断统计 随机神断`)
        }

      }

      //
    })

  // gm*
  ctx.command('shindan.改名 [newPlayerName:text]', '更改名字')
    .action(async ({session}, newPlayerName) => {
      let {userId, username} = session
      username = await getSessionUserName(session)
      await updateNameInPlayerRecord(session, userId, username)
      newPlayerName = newPlayerName?.trim();
      if (!newPlayerName) {
        return await sendMessage(session, `请输入新的名字。`, `改名 随机神断`)
      }
      if (!(config.isEnableQQOfficialRobotMarkdownTemplate && session.platform === 'qq' && config.key !== '' && config.customTemplateId !== '')) {
        return await sendMessage(session, `不是 QQ 官方机器人的话，不用改名哦~`, `改名 随机神断`)
      }
      if (newPlayerName.length > 20) {
        return await sendMessage(session, `新的名字过长，请重新输入。`, `改名 随机神断`)
      }
      const players = await ctx.database.get('shindan_rank', {});
      for (const player of players) {
        if (player.username === newPlayerName) {
          return await sendMessage(session, `新的名字已经存在，请重新输入。`, `改名 随机神断`)
        }
      }
      const userRecord = await ctx.database.get('shindan_rank', {userId});
      if (userRecord.length === 0) {
        await ctx.database.create('shindan_rank', {
          userId,
          username: newPlayerName,
        });
      } else {
        await ctx.database.set('shindan_rank', {userId}, {username: newPlayerName});
      }
      return await sendMessage(session, `名字已更改为：【${newPlayerName}】`, `改名 随机神断`, 2);
    });

  // hs*
  async function updateShindanRank(channelId: string | null, userId: string, username: string) {
    if (!channelId) {
      // 在这里为私聊场景赋予一个默认的 channelId，比如 "privateChatGuildId"
      channelId = "privateChatGuildId";
    }

    // 判断是否存在，不存在则创建
    const shindanUser = await ctx.database.get('shindan_rank', {channelId, userId});
    if (shindanUser.length === 0) {
      await ctx.database.create('shindan_rank', {channelId, userId, username, shindanCount: 1});
    } else {
      // 存在就 + 1
      await ctx.database.set('shindan_rank', {channelId, userId}, {
        username,
        shindanCount: shindanUser[0].shindanCount + 1
      });
    }
  }

  function parseMarkdownCommands(markdownCommands: string): string[] {
    return markdownCommands.split(' ').filter(command => command.trim() !== '');
  }

  async function createButtons(session: any, markdownCommands: string) {
    const commands = parseMarkdownCommands(markdownCommands);

    const mapCommandToDataValue = (command: string) => {
      const commandMappings: Record<string, string> = {
        '查看神断': 'shindan.查看',
        '神断列表': 'shindan.列表',
        '改名': 'shindan.改名',
        '神断次数排行榜': 'shindan.排行榜',
        '删除神断': 'shindan.删除',
        '设置神断': 'shindan.设置',
        '随机神断': 'shindan.随机',
        '添加神断': 'shindan.添加',
        '神断统计': 'shindan.统计',
        '修改神断': 'shindan.修改',
        '自定义神断': 'shindan.自定义',
      };

      return commandMappings[command];
    };

    const createButton = async (command: string) => {
      let dataValue = mapCommandToDataValue(command);
      if (dataValue === undefined) {
        dataValue = command
      }

      return {
        render_data: {
          label: command,
          visited_label: command,
          style: 1,
        },
        action: {
          type: 2,
          permission: {type: 2},
          data: `${dataValue}`,
          enter: !['改名', '查看神断', '删除神断', '设置神断', '添加神断', '自定义神断'].includes(command),
        },
      };
    };

    const buttonPromises = commands.map(createButton);
    return Promise.all(buttonPromises);
  }

  let sentMessages = [];
  const msgSeqMap: { [msgId: string]: number } = {};

  async function sendMessage(session: any, message: any, markdownCommands: string, numberOfMessageButtonsPerRow?: number, isAt: boolean = true, isButton: boolean = false): Promise<void> {
    numberOfMessageButtonsPerRow = numberOfMessageButtonsPerRow || config.numberOfMessageButtonsPerRow;
    const {bot, channelId, userId} = session;
    const username = await getSessionUserName(session)

    let messageId;
    let isPushMessageId = false;
    if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === 'qq') {
      const msgSeq = msgSeqMap[session.messageId] || 10;
      msgSeqMap[session.messageId] = msgSeq + 100;
      const buttons = await createButtons(session, markdownCommands);

      const rows = [];
      let row = {buttons: []};
      buttons.forEach((button, index) => {
        row.buttons.push(button);
        if (row.buttons.length === 5 || index === buttons.length - 1 || row.buttons.length === numberOfMessageButtonsPerRow) {
          rows.push(row);
          row = {buttons: []};
        }
      });

      if (!isButton && config.isTextToImageConversionEnabled) {
        let lines = message.toString().split('\n');
        const isOnlyImgTag = lines.length === 1 && lines[0].trim().startsWith('<img');
        if (isOnlyImgTag) {
          [messageId] = await session.send(message);
        } else {
          if (config.shouldPrefixUsernameInMessageSending && isAt) {
            lines = [`@${username}`, ...lines];
          }
          const modifiedMessage = lines
            .map((line) => {
              if (line.trim() !== '' && !line.includes('<img')) {
                return `# ${line}`;
              } else {
                return line + '\n';
              }
            })
            .join('\n');
          const imageBuffer = await ctx.markdownToImage.convertToImage(modifiedMessage);
          [messageId] = await session.send(h.image(imageBuffer, `image/${config.imageType}`));
        }
        if (config.retractDelay !== 0) {
          isPushMessageId = true;
          sentMessages.push(messageId);
        }

        if (config.isTextToImageConversionEnabled && markdownCommands !== '') {
          await sendMessage(session, '', markdownCommands, numberOfMessageButtonsPerRow, false, true)
        }
      } else if (isButton && config.isTextToImageConversionEnabled) {
        const result = await session.qq.sendMessage(session.channelId, {
          msg_type: 2,
          msg_id: session.messageId,
          msg_seq: msgSeq,
          content: '',
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
        if (message.attrs?.src || message.includes('<img')) {
          [messageId] = await session.send(message);
        } else {
          message = message.replace(/\n/g, '\r');
          if (config.shouldPrefixUsernameInMessageSending && isAt) {
            message = `<@${userId}>\r${message}`;
          }
          const result = await session.qq.sendMessage(session.channelId, {
            msg_type: 2,
            msg_id: session.messageId,
            msg_seq: msgSeq,
            content: '111',
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
        let lines = message.toString().split('\n');
        const isOnlyImgTag = lines.length === 1 && lines[0].trim().startsWith('<img');
        if (isOnlyImgTag) {
          [messageId] = await session.send(message);
        } else {
          if (config.shouldPrefixUsernameInMessageSending && isAt) {
            lines = [`@${username}`, ...lines];
          }
          const modifiedMessage = lines
            .map((line) => {
              if (line.trim() !== '' && !line.includes('<img')) {
                return `# ${line}`;
              } else {
                return line + '\n';
              }
            })
            .join('\n');
          const imageBuffer = await ctx.markdownToImage.convertToImage(modifiedMessage);
          [messageId] = await session.send(h.image(imageBuffer, `image/${config.imageType}`));
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

  async function updateNameInPlayerRecord(session: any, userId: string, username: string): Promise<void> {
    const userRecord = await ctx.database.get('shindan_rank', {userId});

    if (userRecord.length === 0) {
      await ctx.database.create('shindan_rank', {
        userId,
        username,
      });
      return;
    }

    const existingRecord = userRecord[0];
    let isChange = false

    if (username !== existingRecord.username && !(isQQOfficialRobotMarkdownTemplateEnabled && session.platform === 'qq')) {
      existingRecord.username = username;
      isChange = true
    }

    if (isChange) {
      await ctx.database.set('shindan_rank', {userId}, {
        username: existingRecord.username,
      });
    }

  }

  async function getSessionUserName(session: any): Promise<string> {
    let sessionUserName = session.username;

    if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === 'qq') {
      let userRecord = await ctx.database.get('shindan_rank', {userId: session.userId});

      if (userRecord.length === 0) {
        await ctx.database.create('shindan_rank', {
          userId: session.userId,
          username: sessionUserName,
        });

        userRecord = await ctx.database.get('shindan_rank', {userId: session.userId});
      }
      sessionUserName = userRecord[0].username;
    }

    return sessionUserName;
  }

  async function processTargetUser(session: any, userId: string, username: string, targetUser: string): Promise<{
    targetUserRecord: ShindanRank[],
    targetUserId: string
  }> {
    let targetUserRecord = [];
    let targetUserId: string = userId;
    let targetUsername = username;

    if (!targetUser) {
      targetUserRecord = await ctx.database.get('shindan_rank', {userId});
    } else {
      targetUser = await replaceAtTags(session, targetUser);

      if (isQQOfficialRobotMarkdownTemplateEnabled && session.platform === 'qq') {
        targetUserRecord = await ctx.database.get('shindan_rank', {username: targetUser});

        if (targetUserRecord.length === 0) {
          targetUserRecord = await ctx.database.get('shindan_rank', {userId: targetUser});

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
          targetUserRecord = await ctx.database.get('shindan_rank', {userId: targetUser});

          if (targetUserRecord.length !== 0) {
            targetUserId = targetUser;
          }
        } else {
          targetUserRecord = await ctx.database.get('shindan_rank', {userId: targetUserId});
        }
      }
    }

    return {targetUserRecord, targetUserId};
  }

  async function replaceAtTags(session, content: string, isQQ = false): Promise<string> {
    // 正则表达式用于匹配 at 标签
    const atRegex = /<at id="(\d+)"(?: name="([^"]*)")?\/>/g;

    // 匹配所有 at 标签
    let match;
    while ((match = atRegex.exec(content)) !== null) {
      const userId = match[1];
      const name = match[2];

      // 如果 name 不存在，根据 userId 获取相应的 name
      if (!name) {
        if (isQQ) {
          const newAtTag = `<at id="${userId}" name="请在神断指令后面加上你的名字吧~ 例如：我爱你 徐佳瑶"/>`;
          content = content.replace(match[0], newAtTag);
        } else {
          const guildMember = await session.bot.getGuildMember(session.guildId, userId);

          // 替换原始的 at 标签
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

  function isMakeShindanMode(shindanMode: unknown): shindanMode is MakeShindanMode {
    return shindanMode === 'image' || shindanMode === 'text';
  }

  function randomBrowserVersion(): string {
    const buffer = crypto.randomBytes(2);

    const number = buffer.readUInt16BE();

    const major = number >> 8;
    const minor = number & 0xff;

    return `${major}.${minor}.0.0`;
  }

  function randomUserAgent(): string {
    const base = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)';

    const chrome = `Chrome/${randomBrowserVersion()}`;

    const edge = `Edg/${randomBrowserVersion()}`;

    return `${base} ${chrome} Safari/537.36 ${edge}`;
  }

  function generateHeaders() {
    const userAgent = randomUserAgent();

    return {
      'User-Agent': userAgent,
    };
  }

  async function getShindanTitle(shindanId: string): Promise<string> {
    const url = `https://${shindanUrl}.com/${shindanId}`;

    const headers = generateHeaders();

    const response = await retry(() => axios.get(url, {headers}));

    const getDom = new JSDOM(response.data);

    const shindanTitleElement = getDom.window.document.getElementById('shindanTitle');

    if (shindanTitleElement) {
      return shindanTitleElement.textContent || '';
    } else {
      throw new Error('无法找到 shindanTitle。');
    }
  }

  async function retry<T>(
    func: () => Promise<T>,
    retries = maxRetryCount,
    delay = 500,
  ): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < retries; i++) {
      try {
        return await func();
      } catch (error) {

        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, delay * (2 ** i)));
      }
    }
    throw lastError;
  }

}
