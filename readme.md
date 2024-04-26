# koishi-plugin-shindan-maker 🎲

[![npm](https://img.shields.io/npm/v/koishi-plugin-shindan-maker?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-shindan-maker)

## 🎈 介绍

koishi-plugin-shindan-maker 是一个基于 [Koishi](https://koishi.chat/)
的插件，可以让你的机器人使用 [神断网](https://en.shindanmaker.com/)
上的各种有趣的测试和生成器，包括文字和图片模式。你可以随机抽取一个神断，也可以自定义添加或删除神断，还可以修改神断的指令和模式。无论你想要生成一个
OC 角色，还是想要抽取一个老婆，或者想要卖个萌，这个插件都能满足你的需求。😉

## 📦 安装

```bash
npm install koishi-plugin-shindan-maker
```

- 或前往 Koishi 插件市场安装。

## 🎮 使用

- 启动 Koishi，并确保你已经启动了 [puppeteer](https://koishi.chat/guide/plugins/puppeteer.html) 服务。
- 发送 `shindan` 指令，查看神断帮助信息。
- 发送 `shindan.列表` 指令，查看已有的神断列表。
- 发送神断列表中的任意一个神断指令，如 `抽老婆`，即可生成对应的神断结果。
- 你也可以使用 `shindan.随机` 指令，随机抽取一个神断。
- 你还可以使用 `shindan.自定义` 指令，输入一个神断网上的神断 ID，自定义生成一个神断结果。
- 你可以使用 `-t` 或 `-i` 参数，指定生成的神断结果是文本模式还是图片模式。
- 你可以使用 `shindan.添加`，`shindan.删除`，`shindan.修改` 和 `shindan.设置` 指令，管理你的神断列表。

## ⚙️ 配置项

### 神断同步设置

- `isOfficialShindanSyncEnabled`：是否与插件内置神断保持同步。关闭后，将不再为你新增任何神断。默认为 `true`。

### 神断网 URL

- `shindanUrl`：神断网的 URL。可选前缀有 `en`，`kr`，`cn`，`th`，或者无前缀（默认为 `en`）。

### 请求设置

- `maxRetryCount`：最大重试次数。当请求神断网失败时，会尝试重新请求，直到达到最大重试次数（默认为 `3`）。

### 消息发送设置

- `imageType`：图片模式生成的图片类型。可选值有 `png`，`jpeg`，`webp`（默认为 `png`）。
- `shouldPrefixUsernameInMessageSending`: 是否在发送消息时加上 @用户名。
- `retractDelay`: 自动撤回等待的时间，单位是秒。值为 0 时不启用自动撤回功能。
- `isTextToImageConversionEnabled`: 是否开启将文本转为图片的功能（可选），如需启用，需要启用 \`markdownToImage\` 服务。
- `isEnableQQOfficialRobotMarkdownTemplate`: 是否启用 QQ 官方机器人的 Markdown 模板，带消息按钮。
  - `customTemplateId`：自定义模板 ID。
  - `key`：文本内容中特定插值的 key。
  - `numberOfMessageButtonsPerRow`：每行消息按钮的数量。

### 随机神断设置

- `isRandomDivineCommandVisible`：随机神断的时候是否显示神断指令名。默认为 `true`。

### 排行榜设置

- `defaultMaxDisplayCount`：排行榜默认显示的人数。默认为 `10`。

### 神断列表设置

- `defaultShindansBatchCount`：发送神断列表默认的批次数。最大值为 `10`，默认为 `4`。

### 中间件设置

- `shouldMiddlewareInterruptAfterDivineDirective`：中间件是否在获取神断指令之后中断。默认为 `true`。

## 📝 神断命令

### 查看信息

- `shindan`：查看神断帮助信息。
- `shindan.列表 [batchCount:number]`：查看神断列表，可指定批次数和每批显示的神断数量（默认为 `5`）。

### 神断操作

- `shindan.查看 [shindanCommand:text]`：根据神断指令查看神断信息。
- `shindan.排行榜 [number:number]`：查看神断次数排行榜，number 参数为排行榜显示人数，默认为 `20`。
- `shindan.统计 [targetUser:text]`：查看指定用户的神断统计信息。
- `shindan.随机 [shindanName:text]`：随机抽取一个神断，可指定神断名，若不指定则使用用户名（默认为 `text` 模式）。
- `shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]`：自定义生成一个神断结果，需指定神断
  ID，可指定神断名，若不指定则使用用户名，可指定神断模式（默认为 `image` 模式）。

### 神断管理

- `shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]`：添加一个神断到列表中，需指定神断
  ID、神断指令和神断模式（默认为 `image` 模式）。
- `shindan.删除 <shindanCommand:string>`：删除列表中的一个神断，需指定神断指令。
- `shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]`
  ：修改列表中的一个神断，需指定原神断指令、新神断指令和神断模式（默认为原神断模式）。
- `shindan.设置 <shindanCommand:string> <shindanMode:string>`：设置列表中的一个神断的模式，需指定神断指令和神断模式。

## 🙏 致谢

* [Koishi](https://koishi.chat/) - 一个灵活且强大的机器人框架。
* [nonebot-plugin-shindanmaker](https://github.com/noneplugin/nonebot-plugin-shindan) - 功能实现的参考来源。
* [神断网](https://en.shindanmaker.com/) - 提供了各种有趣的测试和生成器。

## 🐱 QQ 群

- 956758505

## ✨ License

MIT License © 2024

希望您喜欢这款插件！ 💫

如有任何问题或建议，欢迎联系我哈~ 🎈
