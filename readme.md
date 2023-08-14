# 🎉 koishi-plugin-shindan-maker 🎉

![](https://img.shields.io/npm/v/koishi-plugin-shindan-maker?style=flat-square)

**koishi-plugin-shindan-maker** 是一个适用于 [Koishi](https://koishi.chat/) 的 [shindanmaker](https://cn.shindanmaker.com/) 占卜插件✨，灵感来源于 [nonebot-plugin-shindanmaker](https://github.com/noneplugin/nonebot-plugin-shindan)🔗。

## 🎈 介绍

该插件可以让 Koishi 机器人获得 [shindanmaker](https://cn.shindanmaker.com/) 的占卜功能🔮，支持多种占卜类型，占卜结果以图片🖼️或文字📝形式发送。

## 👨‍💻 插件状态

* 🚀 使用 puppeteer-core 的 “new” 无头模式，让你的网页截图速度飞起来！
* 🛡️ 稳定的错误处理和重试机制，让你的程序抵御各种异常！
* 🔮 完善的神断操作，让你的插件配置神乎其技！
* 📝 较流畅易读的源码，让你的阅读体验如丝般顺滑！
* 🎁 基本功能已经大致符合要求，更多功能等待后续更新咯~

## 🚀 特性

* 🌈 内置 270+ 神断项目
* 🛡️ 特殊神断列表，防风控
* 💡 支持多种神断类型，可以添加、修改、设置神断项目
* 🎨 将神断结果生成图片发送
* 📘 支持文字和图片两种神断结果格式
* 🎲 可以进行随机神断
* 🎈 随开随用，操作简单

## 🌠 后续计划

* 🤖 兼容所有类型的神断，包括 AI 神断以及分支神断游戏等 [shindanmaker](https://cn.shindanmaker.com/)

## 📦 安装

```
前往 Koishi 插件市场添加该插件即可
```

## ⚙️ 配置

```
`isEnableImageCompression`：是否压缩神断图片
`shindanPictureQuality`：压缩后图片的质量(1-100)
```

## 🎮 使用

- 使用前请确保您能够打开 [shindanmaker](https://shindanmaker.com/) 官网
- 发送 `重置神断` 指令重置神断数据表
- 发送 `神断列表` 指令查看所有可用占卜
- 直接发送 `神断列表` 中的 `神断指令` 即可进行神断 例如：`今天是什么少女`
- 也可以使用 `今天是什么少女 我爱 Koishi` 指定神断的对象
- 若想添加更多神断，请前往 [cn.shindanmaker](https://cn.shindanmaker.com/) 或 [shindanmaker](https://shindanmaker.com/) 官网
- 插件默认开启 `压缩神断图片` 来提高性能，可在下面的配置项进行设置
- 注意： `控制台日志` 中的 `一言` 用来记录尝试错误后重试的次数

### 📝 命令

* `重置神断` - 重置神断数据库（更新插件后使用）
* `神断列表` - 显示所有可用的神断指令
* `<神断指令> [name]` - 使用自定义的神断指令
* `添加神断 <id> <command> [image/text]` - 新增神断项目
* `删除神断 <command>` - 删除神断项目
* `修改神断 <command> <newCommand>` - 修改神断指令名
* `设置神断 <command> <mode>` - 修改神断模式
* `随机神断 [name]` - 随机进行一次神断
* `神断 <id> <name> [image/text]` - 进行一次指定 id 的神断（仅测试用）

## 🙏 致谢

* [Koishi](https://koishi.chat/)：机器人框架
* [nonebot-plugin-shindanmaker](https://github.com/noneplugin/nonebot-plugin-shindan)：功能实现参考

## 📄 License

MIT License © 2023