# koishi-plugin-shindan-maker 🎲

[![npm](https://img.shields.io/npm/v/koishi-plugin-shindan-maker?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-shindan-maker)

## 🎈 介绍

koishi-plugin-shindan-maker 是一个基于 [Koishi](https://koishi.chat/) 的插件，可以让你的机器人使用 [神断网](https://en.shindanmaker.com/) 上的各种有趣的测试和生成器，包括文字和图片模式。你可以随机抽取一个神断，也可以自定义添加或删除神断，还可以修改神断的指令和模式。无论你想要生成一个 OC 角色，还是想要抽取一个老婆，或者想要卖个萌，这个插件都能满足你的需求。😉

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

- `isOfficialShindanSyncEnabled`：是否与插件内置神断保持同步，关闭后，将不会再为你新增任何神断，默认为 `true`。
- `shindanUrl`：神断网的 URL，可选前缀有 `en`，`kr`，`cn`，`th`，或者无前缀（默认为 `en`）。
- `maxRetryCount`：最大重试次数，当请求神断网失败时，会尝试重新请求，直到达到最大重试次数（默认为 `3`）。
- `imageType`：图片模式生成的图片类型，可选值有 `png`，`jpeg`，`webp`（默认为 `png`）。
- `isRandomDivineCommandVisible`：随机神断的时候是否显示神断指令名，默认为 `true`。
- `defaultMaxDisplayCount`：排行榜默认显示的人数，默认为 `20`。
- `shouldMiddlewareInterruptAfterDivineDirective`：中间件是否在获取神断指令之后中断，默认为 `true`。

## 📝 命令

- `shindan`：查看神断帮助信息。
- `shindan.列表 [batchCount:number]`：查看神断列表，可以指定批次数，每批显示的神断数量（默认为 `5`）。
- `shindan.查看 [shindanCommand:text]`：根据神断指令查看神断信息。
- `shindan.排行榜 [number:number]`：查看神断次数排行榜，number 参数为排行榜显示人数，默认为 `20`。
- `shindan.统计 [targerUser:text]`：查看指定用户的神断统计信息。
- `shindan.随机 [shindanName:text]`：随机抽取一个神断，可以指定神断名，如果不指定则使用用户名（默认为 `text` 模式）。
- `shindan.添加 <shindanId:string> <shindanCommand:string> [shindanMode:string]`：添加一个神断到列表中，需要指定神断 ID，神断指令，和神断模式（默认为 `image` 模式）。
- `shindan.删除 <shindanCommand:string>`：删除列表中的一个神断，需要指定神断指令。
- `shindan.修改 <shindanCommand:string> <shindanNewCommand:string> [shindanMode:string]`：修改列表中的一个神断，需要指定原神断指令，新神断指令，和神断模式（默认为原神断模式）。
- `shindan.设置 <shindanCommand:string> <shindanMode:string>`：设置列表中的一个神断的模式，需要指定神断指令和神断模式。
- `shindan.自定义 <shindanId:string> [shindanName:string] [shindanMode:string]`：自定义生成一个神断结果，需要指定神断 ID，可以指定神断名，如果不指定则使用用户名，可以指定神断模式（默认为 `image` 模式）。

## 🙏 致谢

* [Koishi](https://koishi.chat/) - 一个灵活且强大的机器人框架。
* [nonebot-plugin-shindanmaker](https://github.com/noneplugin/nonebot-plugin-shindan) - 功能实现的参考来源。
* [神断网](https://en.shindanmaker.com/) - 提供了各种有趣的测试和生成器。

## 📄 License

MIT License © 2024
