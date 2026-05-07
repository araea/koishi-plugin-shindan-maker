koishi-plugin-shindan-maker
========================

[<img alt="github" src="https://img.shields.io/badge/github-araea/shindan_maker-8da0cb?style=for-the-badge&labelColor=555555&logo=github" height="20">](https://github.com/araea/koishi-plugin-shindan-maker)
[<img alt="npm" src="https://img.shields.io/npm/v/koishi-plugin-shindan-maker.svg?style=for-the-badge&color=fc8d62&logo=npm" height="20">](https://www.npmjs.com/package/koishi-plugin-shindan-maker)

Koishi 的 [ShindanMaker](https://en.shindanmaker.com/) 占卜插件。内置 690+ 占卜项。

## 使用

1. 安装 `puppeteer` 服务（可选，文本模式不依赖）。
2. 发送 `神断帮助.列表` 查看已收录神断指令列表。
3. 直接发送神断指令名即可触发，如 `抽老婆`。
4. 参数 `-t` 切换文本模式，`-i` 切换图片模式。
5. 发送 `神断帮助` 查看完整指令列表。

## 指令（层级式）

所有子指令均归属于 `神断帮助`，使用 `神断帮助.xxx` 调用，便于在 `help` 中分组查看。

| 指令 | 说明 |
|------|------|
| `神断帮助` | 显示所有神断指令帮助 |
| `神断帮助.列表 [页码]` | 查看已收录神断列表 |
| `神断帮助.随机` | 随机执行一个神断 |
| `神断帮助.改名 <昵称>` | 设置神断时使用的昵称 |
| `神断帮助.排行` | 查看使用次数排行榜 |
| `神断帮助.自定义 <ID> [名字] [模式]` | 按ID执行任意神断 |
| `神断帮助.添加 <指令> <ID> [模式]` | 添加新的神断（需管理员权限） |
| `神断帮助.删除 <指令>` | 删除已有的神断（需管理员权限） |
| `神断帮助.设置模式 <指令> <模式>` | 修改神断输出模式（需管理员权限） |
| `神断帮助.修改 <旧指令> <新指令>` | 修改神断指令名称（需管理员权限） |

## 致谢

* [Koishi](https://koishi.chat/)
* [ShindanMaker](https://en.shindanmaker.com/)
* [nonebot-plugin-shindanmaker](https://github.com/noneplugin/nonebot-plugin-shindan)

## QQ 群

* 956758505

<br>

#### License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this crate by you, as defined in the Apache-2.0 license, shall
be dual licensed as above, without any additional terms or conditions.
</sub>
