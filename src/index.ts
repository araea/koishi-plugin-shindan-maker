import { Context, Logger, Schema, h, sleep } from 'koishi'


import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';
import { JSDOM } from 'jsdom';
import { } from 'koishi-plugin-puppeteer';

export const inject = ['puppeteer']
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

## ⚙️ 配置项

- \`shindanUrl\`：神断网的 URL，可选前缀有 \`en\`，\`kr\`，\`cn\`，\`th\`，或者无前缀（默认为 \`en\`）。
- \`maxRetryCount\`：最大重试次数，当请求神断网失败时，会尝试重新请求，直到达到最大重试次数（默认为 \`3\`）。
- \`imageType\`：图片模式生成的图片类型，可选值有 \`png\`，\`jpeg\`，\`webp\`（默认为 \`png\`）。

## 📝 命令

- \`shindan\`：查看神断帮助信息。
- \`shindan.列表 [batchCount:number]\`：查看神断列表，可以指定批次数，每批显示的神断数量（默认为 \`5\`）。
- \`shindan.查看 [shindanCommand:text]\`：根据神断指令查看神断信息。
- \`shindan.随机 [shindanName:text]\`：随机抽取一个神断，可以指定神断名，如果不指定则使用用户名（默认为 \`text\` 模式）。
- \`shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]\`：添加一个神断到列表中，需要指定神断 ID，神断指令，和神断模式（默认为 \`image\` 模式）。
- \`shindan.删除 <shindanCommand:string>\`：删除列表中的一个神断，需要指定神断指令。
- \`shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]\`：修改列表中的一个神断，需要指定原神断指令，新神断指令，和神断模式（默认为原神断模式）。
- \`shindan.设置 <shindanCommand:string> <shindanMode:string>\`：设置列表中的一个神断的模式，需要指定神断指令和神断模式。
- \`shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]\`：自定义生成一个神断结果，需要指定神断 ID，可以指定神断名，如果不指定则使用用户名，可以指定神断模式（默认为 \`image\` 模式）。
`
const logger = new Logger(`shindanMaker`)

export interface Config {
  shindanUrl: string
  imageType: any
  maxRetryCount: number
}

// config
export const Config: Schema<Config> = Schema.object({
  shindanUrl: Schema.string().default('en.shindanmaker').description(`神断 url，可选前缀有：en, kr, cn, th, 无前缀（en 没被墙）。`),
  maxRetryCount: Schema.number()
    .min(1).default(3).description(`最大重试次数。`),
  imageType: Schema.union(['png', 'jpeg', 'webp']).default('png').description(`图片类型。`)
})

type MakeShindanMode = "image" | "text";

declare module 'koishi' {
  interface Tables {
    shindan_rank: shindanRank
  }
}
export interface shindanRank {
  id: number
  guildId: string
  userId: string
  username: string
  shindanCount: number
}

export async function apply(ctx: Context, config: Config) {
  ctx.model.extend('shindan_rank', {
    id: 'unsigned',
    guildId: 'string',
    userId: 'string',
    username: 'string',
    shindanCount: 'integer'
  }, { primary: 'id', autoInc: true })

  const { shindanUrl, maxRetryCount, imageType } = config

  interface Shindan {
    shindanId: string;
    shindanCommand: string;
    shindanMode: string;
    shindanTitle?: string;
  }

  // 检查文件/文件夹是否存在，如果不存在则创建
  function ensureDirExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // 读取 JSON 文件
  function readJSONFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  // 写入 JSON 文件
  function writeJSONFile(filePath: string, data: any) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
  }

  // 主要逻辑
  const filePath = path.join(__dirname, 'shindans.json');
  const shindansDirPath = path.join(ctx.baseDir, 'data', 'shindanMaker');
  const shindansFilePath = path.join(shindansDirPath, 'shindans.json');

  ensureDirExists(shindansDirPath);

  // 判断文件是否存在，如果不存在则创建
  function ensureFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
  }

  ensureFileExists(shindansFilePath);

  // 读取文件中的数据
  const shindansData = readJSONFile(filePath);
  let targetShindansData = readJSONFile(shindansFilePath);

  // 查找缺失的 shindanId
  const missingShindans = shindansData.filter((shindan: any) => {
    return !targetShindansData.some((targetShindan: any) => targetShindan.shindanId === shindan.shindanId);
  });

  // 将缺失的 shindan 对象添加到目标文件中
  targetShindansData = targetShindansData.concat(missingShindans);
  writeJSONFile(shindansFilePath, targetShindansData);

  // 如果 missingShindans 数组不为空，则打印添加的 shindan 对象
  if (missingShindans.length > 0) {
    logger.success('添加的 shindan 对象：', missingShindans);
  }

  const fileContent = await fs.promises.readFile(shindansFilePath, 'utf-8');
  const shindans: Shindan[] = JSON.parse(fileContent);
  shindans.sort((a, b) => a.shindanCommand.localeCompare(b.shindanCommand));

  // zjj*
  ctx.middleware(async (session, next) => {
    const { guildId, userId, username, content } = session
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
    const firstSpaceIndex = modifiedContent.indexOf(' ')
    const command = firstSpaceIndex === -1 ? modifiedContent : modifiedContent.slice(0, firstSpaceIndex)
    const shindanName = firstSpaceIndex === -1 ? username : modifiedContent.slice(firstSpaceIndex + 1)
    const shindan = shindans.find(s => s.shindanCommand === command)
    if (shindan) {
      let { shindanId, shindanMode } = shindan
      if (isText) {
        shindanMode = 'text'
      } else if (isImage) {
        shindanMode = 'image'
      }
      await updateShindanRank(guildId, userId, username)
      await session.execute(`shindan.自定义 ${shindanId} '${shindanName}' ${shindanMode}`)
    } else {
      return next()
    }
  })

  // h*
  ctx.command('shindan', '查看神断帮助')
    .usage(`神断资源：${shindanUrl}.com。`)
    .action(async ({ session }) => {
      //
      await session.execute(`shindan -h`)
      //
    })
  //tj*
  ctx.command('shindan.统计', '查看神断次数')
    .action(async ({ session }) => {
      //
      const { guildId, userId, username } = session
      const shindanUser = await ctx.database.get('shindan_rank', { guildId, userId })
      if (shindanUser.length === 0) {
        await ctx.database.create('shindan_rank', { guildId, userId, username, shindanCount: 0 })
        return `统计对象：${username} 
神断次数：0 次。`
      }
      return `统计对象：${username}
神断次数：${shindanUser[0].shindanCount} 次。`

      //
    })
  // phb*
  ctx.command('shindan.排行榜', '神断次数排行榜')
    .action(async ({ session }) => {
      //
      const shindanUsers = await ctx.database.get('shindan_rank', {});

      // 先根据 shindanCount 将 shindanUsers 中的元素降序排序
      shindanUsers.sort((a: shindanRank, b: shindanRank) => b.shindanCount - a.shindanCount);

      // 遍历 shindanUsers 将每个元素的 username 和 shindanCount 写成 `${index}. ${username}：${shindanCount} 次` 这样的字符串添加到一个字符串数组里
      const rankStrings: string[] = shindanUsers.map((user: shindanRank, index: number) => `${index + 1}. ${user.username}：${user.shindanCount} 次`);

      // 将字符串数组 .join('\n') 作为排行榜显示
      return `神断次数排行榜：

${rankStrings.join('\n')}`
      //
    })
  // ck*
  ctx.command('shindan.查看 <shindanCommand:text>', '查看神断')
    .action(async ({ session }, shindanCommand) => {
      // 查看：
      if (!shindanCommand) {
        return `请提供必要参数 shindanCommand。

指令格式：
查看神断 [shindanCommand]

指令示例：
查看神断 今天是什么少女`
      }
      const existingShindan = shindans.find((shindan) => shindan.shindanCommand === shindanCommand);
      if (!existingShindan) {
        return `指定神断不存在。`
      }
      const { shindanId, shindanMode, shindanTitle } = existingShindan
      return `神断 '${shindanCommand}' 信息如下：

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`
      //
    })
  // sj*
  ctx.command('shindan.随机 [shindanName:text]', '随机神断')
    .option('text', '-t 文本模式')
    .option('image', '-i 图片模式')
    .action(async ({ session, options }, shindanName) => {
      //
      const { username } = session
      if (!shindanName) {
        shindanName = username
      }
      // 判断 shindanName 中是否存在 <at id='' name= ''/> 或 <at id=''/> 这样的内容
      const userIdRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/g;
      let modifiedShindanName = shindanName;
      let matches;

      while ((matches = userIdRegex.exec(shindanName)) !== null) {
        const [, id, name] = matches;
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
      let { shindanId, shindanMode } = randomShindan;
      if (options.text) {
        shindanMode = 'text'
      } else if (options.image) {
        shindanMode = 'image'
      }
      await session.execute(`shindan.自定义 ${shindanId} '${shindanName}' ${shindanMode}`)
      //
    })
  // lb*
  ctx.command('shindan.列表 [batchCount:number]', '神断列表').action(async ({ session }, batchCount = 5) => {
    if (isNaN(batchCount) || batchCount <= 0) {
      return '批次数必须是一个大于 0 的数字';
    }

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
        padding-left: 3px;
        padding-right: 3px;
        padding-top: 1px;
        padding-bottom: 1px;
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

    const generateTable = (rows) => {
      return `
        <html>
          <head>
            ${tableStyle}
          </head>
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

    const page = await ctx.puppeteer.page();
    await page.setViewport({ width: 100, height: 100 });

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
        await page.setContent(html, { waitUntil: 'load' });
        const imgBuffer = await page.screenshot({ fullPage: true, type: imageType });
        await session.send(h.image(imgBuffer, 'image/png'));
        tableRows = [];
      }
    }

    await page.close();
  });

  // tj*
  ctx.command('shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]', '添加神断')
    .action(async ({ session }, shindanId, shindanCommand, shindanMode: MakeShindanMode = 'image') => {
      // 检查参数 神断是否已经存在 神断是否有效 
      if (!shindanId || !shindanCommand) {
        await session.send(`参数缺失，请提供 shindanId 或 shindanCommand。

指令格式：
添加神断 [shindanId] [shindanCommand] [shindanMode]

使用示例：
添加神断 1116736 OC生成器 image
添加神断 1116736 OC生成器 text`);
        return;
      }
      if (!isShindanIdValid(shindanId)) {
        return `shindanId 格式错误，请输入一个有效的 shindanId。`
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(shindanMode)) {
        return `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`
      }

      // 根据 shindanId 检查 shindans 中是否已存在该 shindanId
      const existingShindan = shindans.find((shindan) => shindan.shindanId === shindanId);

      if (existingShindan) {
        // 获取该 shindan 的 shindanCommand 和 shindanMode
        const { shindanCommand, shindanMode } = existingShindan;
        const shindanTitle = await getShindanTitle(shindanId)
        return `神断 '${shindanId}' 已存在。

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`
      } else {
        // 检查是否有效
        const shindanTitle = await getShindanTitle(shindanId)
        const newShindan: Shindan = {
          shindanId,
          shindanCommand,
          shindanMode,
          shindanTitle,
        };

        shindans.push(newShindan);

        fs.writeFileSync(shindansFilePath, JSON.stringify(shindans, null, 2), 'utf-8');

        return `神断 '${shindanCommand}' 添加成功。

神断ID：${shindanId}
神断标题：${shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`
      }
      //
    });
  // sc*
  ctx.command('shindan.删除 <shindanCommand:string>', '删除神断')
    .action(async ({ session }, shindanCommand) => {
      // 删除：检查参数 查找神断是否存在 
      if (!shindanCommand) {
        return `请提供有效的 shindanCommand 参数。
        
指令格式：
删除神断 [shindanCommand]

指令示例：
删除神断 抽老婆`
      }
      const index = shindans.findIndex((shindan) => shindan.shindanCommand === shindanCommand);

      if (index === -1) {
        return `神断 '${shindanCommand}' 不存在。`
      }

      const shindan = shindans[index]; // 获取需要删除的 shindan 对象
      const { shindanId, shindanMode } = shindan; // 提取 shindanId 和 shindanMode

      shindans.splice(index, 1);

      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, 'utf-8');

      return `神断 '${shindanCommand}' 删除成功。

神断ID：${shindanId}
神断指令：${shindanCommand}
神断模式：${shindanMode}`
    });
  // xg*
  ctx.command('shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]', '修改神断')
    .action(async ({ session }, shindanCommand, shindanNewCommand, shindanMode: MakeShindanMode) => {
      // 修改：检查参数 shindanMode 直接可以改 因为只是改指令名或模式
      if (!shindanCommand || !shindanNewCommand) {
        return `缺少参数，请提供 shindanCommand shindanNewCommand。

指令格式：
修改神断 [shindanCommand] [shindanNewCommand] [shindanMode]

指令示例：
修改神断 抽老婆 抽妻子 image
        `
      }

      // 判断 mode 是否为 MakeShindanMode 类型
      if (shindanMode && !isMakeShindanMode(shindanMode)) {
        return `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`
      }

      const shindanIndex = shindans.findIndex((shindan) => shindan.shindanCommand === shindanCommand);

      if (shindanIndex === -1) {
        await session.send(`'${shindanCommand}' 不存在！`);
        return;
      }

      const shindan = shindans[shindanIndex];
      shindan.shindanCommand = shindanNewCommand;
      if (shindanMode !== undefined) {
        shindan.shindanMode = shindanMode;
      }
      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, 'utf-8');

      await session.send(`'${shindanCommand}' 已成功修改为 '${shindanNewCommand}'。
      
神断ID：${shindan.shindanId}
神断标题：${shindan.shindanTitle}
神断指令：${shindanNewCommand}
神断模式：${(shindanMode ? shindanMode : shindan.shindanMode)}`);

    });
  // sz*
  ctx.command('shindan.设置 <shindanCommand:string> <shindanMode:string>', '设置神断')
    .action(async ({ session }, shindanCommand, shindanMode: MakeShindanMode) => {
      // 设置：检查参数 检查 shindanMode 更改 shindans 记录
      if (!shindanCommand || !shindanMode) {
        return `缺少参数，请提供 shindanCommand shindanMode

指令格式：
设置神断 [shindanCommand] [shindanMode]

指令示例：
设置神断 卖萌 text`
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(shindanMode)) {
        return `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`
      }
      const shindanIndex = shindans.findIndex((shindan) => shindan.shindanCommand === shindanCommand);

      if (shindanIndex === -1) {
        await session.send(`'${shindanCommand}' 不存在！`);
        return;
      }

      const shindan = shindans[shindanIndex];
      shindan.shindanMode = shindanMode;
      const updatedContent = JSON.stringify(shindans, null, 2);
      fs.writeFileSync(shindansFilePath, updatedContent, 'utf-8');
      return `设置神断 '${shindanCommand}' 成功。
      
神断ID：${shindan.shindanId}
神断标题：${shindan.shindanTitle}
神断指令：${shindanCommand}
神断模式：${shindanMode}`
      //
    })
  // zdy**
  ctx.command('shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]', '自定义神断')
    .action(async ({ session }, shindanId, shindanName?, shindanMode?) => {
      // 检查shindanId shindanMode
      const { guildId, userId, username } = session
      if (!shindanId) {
        return `请提供必要的参数 shindanId。
        
指令格式：
神断 [shindanId] [shindanName] [shindanMode]

指令示例：
神断 1116736 小小学 image`
      }
      if (!isShindanIdValid(shindanId)) {
        return `shindanId 格式错误，请输入一个有效的 shindanId。`
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
      let matches;

      while ((matches = userIdRegex.exec(shindanName)) !== null) {
        const [, id, name] = matches;
        if (name) {
          modifiedShindanName = modifiedShindanName.replace(matches[0], name);
        }
      }

      shindanName = modifiedShindanName;
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(shindanMode)) {
        return `参数 shindanMode 不是有效的类型，请输入 image 或 text 中的一个。`
      }
      const url = `https://${shindanUrl}.com/${shindanId}`;

      const headers = generateHeaders()

      const response = await retry(() => axios.get(url, { headers }))

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
        // shindanMode = 'imgae'
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
  <script src="https://dkhhsjgarvlsj.cloudfront.net/public/js/app.js?id=54344e833cba8e7031dc8738d5b4502e"
    defer></script>
  <script src="https://dkhhsjgarvlsj.cloudfront.net/public/js/chart.js?id=70d18405b84dcf0cdc534eea21f4c23c"
    defer></script>`

        const html = `
  <html lang="zh">
  
  <head>
    <link rel="stylesheet"
      href="https://dkhhsjgarvlsj.cloudfront.net/public/css/app.css?id=ef4ab887060ae6109de7f9c74d05aa6c">
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

        const page = await ctx.puppeteer.page();
        await page.setViewport({
          width: 750, height: 100,
        });
        await page.setContent(html, { waitUntil: 'load' });
        hasChart ? await sleep(2000) : '';

        // 找到 title_and_result 元素并截图
        const titleAndResultElement = await page.$('#title_and_result');
        const imgBuffer = await titleAndResultElement.screenshot({ type: imageType });

        await page.close();
        return h.image(imgBuffer, 'image/png');

      }

      //
    })

  async function updateShindanRank(guildId: string, userId: string, username: string) {
    // 判断是否存在，不存在则创建
    const shindanUser = await ctx.database.get('shindan_rank', { guildId, userId })
    if (shindanUser.length === 0) {
      await ctx.database.create('shindan_rank', { guildId, userId, username, shindanCount: 1 })
    } else {
      // 存在就 + 1 
      await ctx.database.set('shindan_rank', { guildId, userId }, { username, shindanCount: shindanUser[0].shindanCount + 1 })
    }
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

    const headers = {
      'User-Agent': userAgent,
    };

    return headers;
  }
  async function getShindanTitle(shindanId: string): Promise<string> {
    const url = `https://${shindanUrl}.com/${shindanId}`;

    const headers = generateHeaders();

    const response = await retry(() => axios.get(url, { headers }));

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
