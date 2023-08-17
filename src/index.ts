import { Context, Schema, Logger, h, Keys } from 'koishi'
import { } from '@koishijs/plugin-help'
import { } from '@koishijs/plugin-adapter-onebot'
import crypto from 'crypto';
import puppeteer, { Browser, Page } from "puppeteer-core";
import find from 'puppeteer-finder'
import { EventEmitter } from 'events';

export const name = 'shindan-maker'
// 数据库加载后插件才生效
export const using = ['database']
// 设置全局最大监听器限制
EventEmitter.defaultMaxListeners = Infinity
// 注册神断 Logger
const logger = new Logger('神断')
export const usage = `# 更新插件后请使用 \`重置神断\` 重置神断数据表
## 🎮 使用

- 使用前请确保您能够打开 [shindanmaker](https://shindanmaker.com/) 官网
- 发送 \`重置神断\` 指令重置神断数据表
- 发送 \`神断列表\` 指令查看所有可用占卜
- 直接发送 \`神断列表\` 中的 \`神断指令\` 即可进行神断 例如：\`今天是什么少女\`
- 也可以使用 \`今天是什么少女 我爱 Koishi\` 指定神断的对象
- 若想添加更多神断，请前往 [cn.shindanmaker](https://cn.shindanmaker.com/) 或 [shindanmaker](https://shindanmaker.com/) 官网
- 插件默认开启 \`压缩神断图片\` 来提高性能，可在下面的配置项进行设置
- 注意： \`控制台日志\` 中的 \`一言\` 用来记录尝试错误后重试的次数


### 📝 命令

- \`重置神断\` - 重置神断数据库（更新插件后使用）
- \`启用文字版神断\` - 一键将所有神断模式改为 text（无图模式）
- \`神断列表\` - 显示所有可用的神断指令
  - \`-t\` 文字版神断列表
- \`<神断指令> [name]\` - 使用自定义的神断指令
- \`添加神断 <id> <command> [image/text]\` - 新增神断项目
- \`删除神断 <command>\` - 删除神断项目
- \`修改神断 <command> <newCommand>\` - 修改神断指令名
- \`设置神断 <command> <mode>\` - 修改神断模式
- \`随机神断 [name]\` - 随机进行一次神断
- \`神断 <id> <name> [image/text]\` - 进行一次指定 id 的神断（仅测试用）`

export interface Config {
  isEnableImageCompression: boolean
  shindanPictureQuality: number
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    isEnableImageCompression: Schema.boolean().default(true).description('是否压缩神断图片'),
  }).description('基础配置'),
  Schema.union([
    Schema.object({
      isEnableImageCompression: Schema.const(true),
      shindanPictureQuality: Schema.number().min(1).max(100).default(80).description('压缩后图片的质量(1-100)'),
    }),
    Schema.object({}),
  ])
]) as Schema<Config>

// 神断结果返回模式
type MakeShindanMode = "image" | "text";
// 默认神断指令
const defaultShindanCommands = [
  { shindanId: '917962', command: '人设生成', mode: 'image' },
  { shindanId: '587874', command: '异世界转生', mode: 'image' },
  { shindanId: '940824', command: '魔法人生', mode: 'image' },
  { shindanId: '400813', command: '抽舰娘', mode: 'image' },
  { shindanId: '361845', command: '抽高达', mode: 'image' },
  { shindanId: '595068', command: '英灵召唤', mode: 'image' },
  { shindanId: '360578', command: '卖萌', mode: 'text' },
  { shindanId: '162207', command: '今天是什么少女', mode: 'image' },
  { shindanId: '833360', command: '宠物培养', mode: 'image' },
  { shindanId: '1116736', command: 'OC生成', mode: 'image' },
  { shindanId: '1110841', command: '神级动漫', mode: 'image' },
  { shindanId: '1075116', command: '抽二次元妻', mode: 'image' },
  { shindanId: '1115622', command: '我的墓碑前会有什么', mode: 'image' },
  { shindanId: '833754', command: '我一生中最大的遗憾', mode: 'image' },
  { shindanId: '1154683', command: '变身', mode: 'image' },
  { shindanId: '829014', command: '神明创造我的十日', mode: 'image' },
  { shindanId: '864453', command: '欲望雷达', mode: 'image' },
  { shindanId: '942140', command: '配色生成', mode: 'image' },
  { shindanId: '1157184', command: '罐头人设', mode: 'image' },
  { shindanId: '28414', command: 'SM测试', mode: 'image' },
  { shindanId: '790697', command: '中二称号', mode: 'image' },
  { shindanId: '829767', command: '每日cp故事', mode: 'image' },
  { shindanId: '832219', command: '绘画关键词', mode: 'image' },
  { shindanId: '866449', command: 'ABO测定', mode: 'image' },
  { shindanId: '917681', command: '三字自我', mode: 'image' },
  { shindanId: '1052778', command: '原神世界转生', mode: 'image' },
  { shindanId: '637294', command: '女性人设生成', mode: 'image' },
  { shindanId: '827223', command: '神袛身份', mode: 'image' },
  { shindanId: '1059404', command: '马娘相性', mode: 'image' },
  { shindanId: '1151175', command: '每日运势', mode: 'image' },
  { shindanId: '1171184', command: '随机器15号', mode: 'image' },
  { shindanId: '1064580', command: '令咒图标', mode: 'image' },
  { shindanId: '454982', command: '无梗助手', mode: 'image' },
  { shindanId: '1172452', command: '告白成功率', mode: 'image' },
  { shindanId: '837833', command: '每日台词', mode: 'image' },
  { shindanId: '898330', command: '每日三关键词', mode: 'image' },
  { shindanId: '22074', command: '男版的自己', mode: 'image' },
  { shindanId: '384482', command: '互动脑洞关键词', mode: 'image' },
  { shindanId: '383328', command: '互动命题', mode: 'image' },
  { shindanId: '820217', command: '来梗', mode: 'image' },
  { shindanId: '845842', command: '概括我的一生', mode: 'image' },
  { shindanId: '919572', command: '猜猜我的性癖', mode: 'image' },
  { shindanId: '1075782', command: '每日OC十连', mode: 'image' },
  { shindanId: '1130121', command: '性格危险度测定', mode: 'image' },
  { shindanId: '1130619', command: '我的故事', mode: 'image' },
  { shindanId: '1135729', command: '来一句带感的台词', mode: 'image' },
  { shindanId: '1150537', command: '今日任斗', mode: 'image' },
  { shindanId: '1163454', command: '抽原神', mode: 'image' },
  { shindanId: '1150872', command: '抽塔罗', mode: 'image' },
  { shindanId: '1150687', command: '抽老婆', mode: 'image' },
  { shindanId: '1110781', command: '抽特殊能力', mode: 'image' },
  { shindanId: '738333', command: 'ABO角色设定', mode: 'image' },
  { shindanId: '22157', command: '女版的自己', mode: 'image' },
  { shindanId: '829511', command: '我爱你', mode: 'image' },
  { shindanId: '905484', command: '我的替身能力', mode: 'image' },
  { shindanId: '829594', command: '会杀死我的东西', mode: 'image' },
  { shindanId: '827937', command: '属于我的神秘故事', mode: 'image' },
  { shindanId: '830408', command: '我的追星结局', mode: 'image' },
  { shindanId: '16073', command: '我的野心', mode: 'image' },
  { shindanId: '799899', command: '一句话创作', mode: 'image' },
  { shindanId: '210287', command: '我的二次元少女形象', mode: 'image' },
  { shindanId: '394047', command: '每日重口', mode: 'image' },
  { shindanId: '35290', command: '身为古代人的我', mode: 'image' },
  { shindanId: '35462', command: '我的自传', mode: 'image' },
  { shindanId: '35169', command: '我会困在梦的第几层', mode: 'image' },
  { shindanId: '22206', command: '每日二次元的我', mode: 'image' },
  { shindanId: '1171473', command: '每日歌词', mode: 'image' },
  { shindanId: '830443', command: '世间万物化成的我', mode: 'image' },
  { shindanId: '897114', command: '明日方舟角色生成', mode: 'image' },
  { shindanId: '1088007', command: '每日哈利波特魔法人生', mode: 'image' },
  { shindanId: '1098388', command: '假如我闯入了ABO世界的内娱', mode: 'image' },
  { shindanId: '555143', command: '每日异世界属性面板', mode: 'image' },
  { shindanId: '1101491', command: '我与CP的关系', mode: 'image' },
  { shindanId: '16051', command: '小JJ长度测定', mode: 'image' },
  { shindanId: '288809', command: '我的二次元男性设定', mode: 'image' },
  { shindanId: '829595', command: '铸造我的灵魂', mode: 'image' },
  { shindanId: '828905', command: '我是什么小动物', mode: 'image' },
  { shindanId: '24700', command: '我的自传一生回忆', mode: 'image' },
  { shindanId: '556031', command: '饲养宠物的正确方法', mode: 'image' },
  { shindanId: '1059228', command: '如果我是一只马娘', mode: 'image' },
  { shindanId: '738291', command: '穿越异世界状态版面', mode: 'image' },
  { shindanId: '759939', command: '梦病塔永夜之医疗塔', mode: 'image' },
  { shindanId: '834482', command: '死前眼底映照', mode: 'image' },
  { shindanId: '828438', command: '我的外在与内在的成分', mode: 'image' },
  { shindanId: '20880', command: '最适合我的绰号', mode: 'image' },
  { shindanId: '829712', command: 'CP之间发生过什么', mode: 'image' },
  { shindanId: '30052', command: '最搭配的动漫女角', mode: 'image' },
  { shindanId: '28047', command: '平行宇宙中的我', mode: 'image' },
  { shindanId: '23446', command: '最赚钱的职业是什么', mode: 'image' },
  { shindanId: '913532', command: '魔法世界中的职业属性', mode: 'image' },
  { shindanId: '528555', command: '反派角色类型测定', mode: 'image' },
  { shindanId: '16164', command: '未开发的必杀技测定', mode: 'image' },
  { shindanId: '162924', command: '动漫中的我的样子', mode: 'image' },
  { shindanId: '1111932', command: '我的OC童年', mode: 'image' },
  { shindanId: '525431', command: 'BL重口H生成器', mode: 'image' },
  { shindanId: '926484', command: '肉文梗生成器', mode: 'image' },
  { shindanId: '905435', command: '明日方舟干员生成', mode: 'image' },
  { shindanId: '843854', command: '墓志铭地狱风味', mode: 'image' },
  { shindanId: '28733', command: '哪里不对劲怎么办', mode: 'image' },
  { shindanId: '29060', command: '我是什么控', mode: 'image' },
  { shindanId: '828228', command: '假面骑士生成器', mode: 'image' },
  { shindanId: '162994', command: 'Servant属性测定', mode: 'image' },
  { shindanId: '827798', command: '人格面具属性测定', mode: 'image' },
  { shindanId: '827537', command: '我爱的人是谁', mode: 'image' },
  { shindanId: '792129', command: '私欲外貌设定', mode: 'image' },
  { shindanId: '863622', command: 'H时的呻吟', mode: 'image' },
  { shindanId: '21973', command: '我的主人', mode: 'image' },
  { shindanId: '635902', command: '娘化穿越异世界', mode: 'image' },
  { shindanId: '731066', command: '人格特质分布之九型人格', mode: 'image' },
  { shindanId: '26646', command: '我是什么样的猫', mode: 'image' },
  { shindanId: '1135663', command: '死前映像', mode: 'image' },
  { shindanId: '976056', command: '人设生成器2', mode: 'image' },
  { shindanId: '829302', command: '隐藏气味', mode: 'image' },
  { shindanId: '26988', command: '傲娇程度测定', mode: 'image' },
  { shindanId: '24963', command: '成为一本书吧', mode: 'image' },
  { shindanId: '851659', command: '二次元人设生成器', mode: 'image' },
  { shindanId: '1104123', command: '韩娱9人男团', mode: 'image' },
  { shindanId: '27865', command: '时间占比测定', mode: 'image' },
  { shindanId: '749044', command: '作为魔王的事迹', mode: 'image' },
  { shindanId: '486338', command: '每日三题生成', mode: 'image' },
  { shindanId: '316802', command: '召唤的英灵', mode: 'image' },
  { shindanId: '1098005', command: 'CP的关键词', mode: 'image' },
  { shindanId: '828977', command: '我是什么故事的主角呢', mode: 'image' },
  { shindanId: '767626', command: '与我的深渊', mode: 'image' },
  { shindanId: '831016', command: 'CP的一生组成', mode: 'image' },
  { shindanId: '1103980', command: '内娱9人女团', mode: 'image' },
  { shindanId: '20263', command: '古代姓名字号', mode: 'image' },
  { shindanId: '87845', command: '剑与魔法世界', mode: 'image' },
  { shindanId: '42890', command: 'H时的呻吟续', mode: 'image' },
  { shindanId: '26637', command: '人造少女', mode: 'image' },
  { shindanId: '637918', command: '娘化穿越异世界正经版', mode: 'image' },
  { shindanId: '1135662', command: '小剧场题材', mode: 'image' },
  { shindanId: '827891', command: '香气测定', mode: 'image' },
  { shindanId: '807196', command: '每日CP互动', mode: 'image' },
  { shindanId: '835973', command: 'CP的幸福结局', mode: 'image' },
  { shindanId: '443593', command: '本命武器测定', mode: 'image' },
  { shindanId: '905558', command: '色色的魔物娘', mode: 'image' },
  { shindanId: '695886', command: 'COC人物卡', mode: 'image' },
  { shindanId: '162202', command: '中国的圣杯战争', mode: 'image' },
  { shindanId: '830216', command: '命中注定的男朋友', mode: 'image' },
  { shindanId: '896449', command: '异世界的天赋技能', mode: 'image' },
  { shindanId: '829339', command: '未被打碎的过去', mode: 'image' },
  { shindanId: '28206', command: '未来的另一半', mode: 'image' },
  { shindanId: '807174', command: '每日CP互动题材', mode: 'image' },
  { shindanId: '790659', command: '奇妙的角色生成器', mode: 'image' },
  { shindanId: '23346', command: '我的仆人', mode: 'image' },
  { shindanId: '522194', command: '替身属性测定', mode: 'image' },
  { shindanId: '873026', command: 'CP的三句歌词', mode: 'image' },
  { shindanId: '850187', command: '第二人格测定', mode: 'image' },
  { shindanId: '957935', command: '霍格沃茨毕业生', mode: 'image' },
  { shindanId: '701727', command: 'CP主题发挥', mode: 'image' },
  { shindanId: '764124', command: '罪囚生平与谎言', mode: 'image' },
  { shindanId: '1122723', command: '某天做的梦', mode: 'image' },
  { shindanId: '35205', command: '我的拟人动物', mode: 'image' },
  { shindanId: '346290', command: '我的英灵职阶', mode: 'image' },
  { shindanId: '1126968', command: '香水工坊', mode: 'image' },
  { shindanId: '22295', command: '男版的自己2', mode: 'image' },
  { shindanId: '27587', command: '我最喜欢的人', mode: 'image' },
  { shindanId: '1079091', command: '色色十连', mode: 'image' },
  { shindanId: '1099294', command: '色色互动话题', mode: 'image' },
  { shindanId: '1051455', command: '我的色色文梗单人女性向', mode: 'image' },
  { shindanId: '638952', command: '如果变成触手怪的话', mode: 'image' },
  { shindanId: '1132629', command: '阎魔之目', mode: 'image' },
  { shindanId: '1171805', command: '用几句歌词来概括我', mode: 'image' },
  { shindanId: '1129921', command: '道诡人生', mode: 'image' },
  { shindanId: '1109819', command: '创作用句', mode: 'image' },
  { shindanId: '806227', command: '自杀', mode: 'image' },
  { shindanId: '940214', command: '角之旅', mode: 'image' },
  { shindanId: '1168322', command: '今天是什么糖果', mode: 'image' },
  { shindanId: '318410', command: '动漫角色测定', mode: 'image' },
  { shindanId: '316024', command: '现在吃什么', mode: 'image' },
  { shindanId: '1031149', command: '每日黄梗', mode: 'image' },
  { shindanId: '426611', command: '我在魔法世界的能力或武器', mode: 'image' },
  { shindanId: '464514', command: '我的超能力测试', mode: 'image' },
  { shindanId: '686074', command: '我的魔禁tf测试', mode: 'image' },
  { shindanId: '17507', command: '我的战斗力', mode: 'image' },
  { shindanId: '21431', command: '适合待在我身边的执事与女仆', mode: 'image' },
  { shindanId: '934511', command: '一个纷乱的梦', mode: 'image' },
  { shindanId: '1136163', command: '勇闯KPL', mode: 'image' },
  { shindanId: '790825', command: '奇妙的配色环', mode: 'image' },
  { shindanId: '790800', command: '奇妙的乱睡角色生成器', mode: 'image' },
  { shindanId: '790673', command: '奇妙的教会生成器', mode: 'image' },
  { shindanId: '832081', command: '每日专属魔药', mode: 'image' },
  { shindanId: '832039', command: '当我变成了战术人形', mode: 'image' },
  { shindanId: '21565', command: '我有多S', mode: 'image' },
  { shindanId: '1168478', command: 'COJ随机里ho生成器', mode: 'image' },
  { shindanId: '870739', command: '我作为女奥特曼是怎么败北的', mode: 'image' },
  { shindanId: '995787', command: '奇异少年抓捕装置3', mode: 'image' },
  { shindanId: '1090381', command: '查收魅魔档案', mode: 'image' },
  { shindanId: '870843', command: '每日拷问女奥特曼', mode: 'image' },
  { shindanId: '995775', command: '奇异少年抓捕装置1', mode: 'image' },
  { shindanId: '1007603', command: '属于我的龙与地下城冒险之证', mode: 'image' },
  { shindanId: '944833', command: '霍格沃兹聊天室', mode: 'image' },
  { shindanId: '1152099', command: '今天是什么欧派', mode: 'image' },
  { shindanId: '1148670', command: '性癖大爆炸', mode: 'image' },
  { shindanId: '1051544', command: '奇异少年诱捕装置2', mode: 'image' },
  { shindanId: '1075343', command: '我的JOJO替身测定', mode: 'image' },
  { shindanId: '624261', command: '我的JOJO世界转生', mode: 'image' },
  { shindanId: '965601', command: '我的JOJO老婆', mode: 'image' },
  { shindanId: '1000666', command: '我的JOJO做爱', mode: 'image' },
  { shindanId: '1077564', command: '今天穿什么胖次', mode: 'image' },
  { shindanId: '1155175', command: '清河春日幻境之旅', mode: 'image' },
  { shindanId: '1111492', command: '我身上燃烧的火焰精神', mode: 'image' },
  { shindanId: '1126051', command: '今天的可蕾也最喜欢了', mode: 'image' },
  { shindanId: '1058945', command: '我的表里人格一致吗', mode: 'image' },
  { shindanId: '1066594', command: '我是大楚皇宫里面的谁', mode: 'image' },
  { shindanId: '1044378', command: '抽台湾地名', mode: 'image' },
  { shindanId: '1167768', command: '原神，启动！', mode: 'image' },
  { shindanId: '1150686', command: '抽P3老婆', mode: 'image' },
  { shindanId: '1150610', command: '抽女神异闻录老婆', mode: 'image' },
  { shindanId: '1150609', command: '抽P4老婆', mode: 'image' },
  { shindanId: '1150594', command: '抽P5老婆', mode: 'image' },
  { shindanId: '541545', command: '抽星武', mode: 'image' },
  { shindanId: '734972', command: '抽内裤', mode: 'image' },
  { shindanId: '1163576', command: '抽原神简易版', mode: 'image' },
  { shindanId: '1162435', command: '让我变成怪物吧', mode: 'image' },
  { shindanId: '1160508', command: '抽神奇宝贝', mode: 'image' },
  { shindanId: '1150770', command: '我的原神角色', mode: 'image' },
  { shindanId: '1150319', command: '如果我成为魔王', mode: 'image' },
  { shindanId: '572991', command: '随机调色板', mode: 'image' },
  { shindanId: '16775', command: '我未來的老公或老婆', mode: 'image' },
  { shindanId: '1169935', command: '我的揍人学院学生证', mode: 'image' },
  { shindanId: '1142582', command: '抽主人', mode: 'image' },
  { shindanId: '1000507', command: '抽老公2', mode: 'image' },
  { shindanId: '876174', command: '抽老公', mode: 'image' },
  { shindanId: '1169928', command: '我的激战2OC', mode: 'image' },
  { shindanId: '1167846', command: '我的噬神者OC', mode: 'image' },
  { shindanId: '1167596', command: '我的噬血代码OC', mode: 'image' },
  { shindanId: '1161422', command: '我的卧龙OC', mode: 'image' },
  { shindanId: '1160229', command: '我的垃圾站幻想人设', mode: 'image' },
  { shindanId: '1153659', command: 'Shanthi家OC角色发生器', mode: 'image' },
  { shindanId: '1152188', command: '我是什么样的BL角色', mode: 'image' },
  { shindanId: '1150916', command: '哥们考试', mode: 'image' },
  { shindanId: '1150888', command: '抽能量属性', mode: 'image' },
  { shindanId: '1144712', command: '我的最终幻想14OC', mode: 'image' },
  { shindanId: '1150177', command: '我的无限流游戏男朋友', mode: 'image' },
  { shindanId: '1149739', command: '我的玄幻世界身份', mode: 'image' },
  { shindanId: '1145946', command: '我的欲望指数', mode: 'image' },
  { shindanId: '1142797', command: '每日奇幻人设生成', mode: 'image' },
  { shindanId: '1142562', command: '我的怪物猎人崛起OC', mode: 'image' },
  { shindanId: '1140990', command: 'OC生成器', mode: 'image' },
  { shindanId: '1139845', command: '我的十二月女团', mode: 'image' },
  { shindanId: '1137909', command: '我的怪物猎人世界OC', mode: 'image' },
  { shindanId: '1135578', command: '我的数码兽抉择者女', mode: 'image' },
  { shindanId: '1135573', command: '抽数码兽抉择者人物卡', mode: 'image' },
  { shindanId: '1135572', command: '我的数码兽抉择者', mode: 'image' },
  { shindanId: '1133418', command: '每日新班级座位表', mode: 'image' },
  { shindanId: '1130223', command: '我的心之兽构成原因', mode: 'image' },
  { shindanId: '1130217', command: '我的心之兽素质', mode: 'image' },
  { shindanId: '1126910', command: '我穿越到执剑之刻里的设定', mode: 'image' },
  { shindanId: '1121982', command: '敏感度诊断', mode: 'image' },
  { shindanId: '1102874', command: '我的冉群属性2', mode: 'image' },
  { shindanId: '1102872', command: '我的冉群属性', mode: 'image' },
  { shindanId: '1099408', command: '抽元素', mode: 'image' },
  { shindanId: '1097999', command: '关于我转学到如恩学院这件事', mode: 'image' },
  { shindanId: '1093459', command: '高考成绩生成器', mode: 'image' },
  { shindanId: '1092787', command: '我被葬入无畏机甲的角色', mode: 'image' },
  { shindanId: '1092679', command: '我娘化后在战锤40k宇宙生存', mode: 'image' },
  { shindanId: '1092608', command: '我成为星际战士的战斗力', mode: 'image' },
  { shindanId: '1090825', command: '我的恋爱观', mode: 'image' },
  { shindanId: '1089994', command: '我的个人属性', mode: 'image' },
  { shindanId: '1085569', command: '我适合什么样的赛马娘怪文书', mode: 'image' },
  { shindanId: '1084644', command: '我的角之国某学院学生档案', mode: 'image' },
  { shindanId: '1083312', command: '穿越到二次世界大战的我会是什么将军呢', mode: 'image' },
  { shindanId: '1079854', command: '我在空中花园已经不当人了', mode: 'image' },
  { shindanId: '1073636', command: '每日随机数值', mode: 'image' },
  { shindanId: '1070601', command: '我的粉丝构成', mode: 'image' },
  { shindanId: '1062457', command: '我的架空世界角色', mode: 'image' },
  { shindanId: '1062077', command: '今天是什么宝可梦', mode: 'image' },
  { shindanId: '1062001', command: '今天是什么多娜多娜人材', mode: 'image' },
  { shindanId: '1061975', command: '今天画画用什么人设', mode: 'image' },
  { shindanId: '1060224', command: '今天是什么誓灵', mode: 'image' },
  { shindanId: '1060802', command: '我的小小雷达图测定', mode: 'image' },
  { shindanId: '877212', command: '每日哥谭十连抽', mode: 'image' },
  { shindanId: '828727', command: '我会成为怎样的美少女偶像呢', mode: 'image' },
]

// puppeteer-finder模块可以查找本机安装的Chrome / Firefox / Edge浏览器
const executablePath = find();


// 类型合并
declare module 'koishi' {
  interface Tables {
    shindan_commands: ShindanCommands
  }
}

// shindan_instructions 的类型接口 ShindanInstructions
export interface ShindanCommands {
  shindanId: string
  command: string
  mode: MakeShindanMode
}

// 插件主体
export async function apply(ctx: Context, config: Config) {
  // 拓展表
  extendedTable(ctx)
  // 插入默认神断指令
  await insertDefaultShindanCommands(ctx)
  // 注册指令：shindan、神断、重置神断、添加神断、删除神断、修改神断、设置神断、随机神断、神断列表
  registerKoishiCommands(ctx, config)
  // 注册事件监听器处理神断指令
  await registerEventEmitter(ctx)
}

function extendedTable(ctx: Context) {
  ctx.model.extend('shindan_commands', {
    // 各字段类型
    shindanId: 'string',
    command: 'string',
    mode: 'string',
  }, {
    // 设置主键
    primary: 'shindanId',
    // 禁止 shindanId 和 command 重复
    unique: ['shindanId', 'command'],
  })
}

async function insertDefaultShindanCommands(ctx: Context) {
  // 判断数据表是否为空
  const result = await ctx.model.get('shindan_commands', {});
  if (result.length === 0) {
    await ctx.model.upsert('shindan_commands', defaultShindanCommands)
    logger.success('神断指令初始化成功！')
  } else {
    logger.success('神断指令加载成功！')
  }
}

async function registerKoishiCommands(ctx: Context, config: Config) {
  //  注册指令
  ctx.command('shindan', '查看神断帮助')
    .action(() => {
      return `请发送 \`神断列表\` 查看所有可用神断项目！

如需对神断进行进一步操作，请使用 \`shindan -h\` 查看所有可用的神断操作！`
    })
  ctx.command('shindan/神断 <shindanId> <name> [mode]', '进行一次神断', { hidden: true })
    .usage(`注意：该指令仅供测试使用！`)
    .example(`神断 162207 张三丰 image
    神断 1174111 奇衡三 text`)
    .action(async ({ session }, shindanId, name, mode: MakeShindanMode = 'image') => {
      // 检测必选参数是否存在
      if (!shindanId || !name) {
        return `请输入必选的 shindanId 和 name 参数！

注意：
    该指令仅供测试使用！

指令格式：
    神断 <shindanId> <name> [mode]

使用示例：
    神断 162207 张三丰 image
    神断 1174111 奇衡三 text`
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(mode)) {
        return `参数 mode 不是有效的 MakeShindanMode 类型，请输入 image 或 text 中的一个。`
      }
      // 随机生成 userAgent 字符串
      const userAgent = randomUserAgent();

      try {
        // 调用 fetchImage 函数并获取缓冲区和文本
        const { buffer, text } = await fetchImage(userAgent, shindanId, name);

        if (mode === "image") {
          await session.send(h.image(buffer, 'image/png'));
        } else {
          await session.send(text);
        }
      } catch (error) {
        await session.send(`无法获取数据，请稍后再试。`);
      }
    })
  ctx.command('shindan/重置神断', '刷新神断指令数据')
    .action(async ({ session }) => {
      await ctx.model.remove('shindan_commands', {})
      await insertDefaultShindanCommands(ctx)
      // 获取所有神断指令
      shindanCommands = await ctx.model.get('shindan_commands', {});
      shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
      await session.send('神断已成功重置！')
    })
  ctx.command('shindan/启用文字版神断', '一键将所有神断模式改为 text')
    .action(async ({ session }) => {
      await ctx.model.set('shindan_commands', {}, { mode: 'text' })
      // 获取所有神断指令
      shindanCommands = await ctx.model.get('shindan_commands', {});
      shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
      await session.send('文字版神断已启用！如需恢复只需发送 `重置神断`即可！')
    })
  ctx.command('shindan/添加神断 <shindanId> <command> [mode]', '添加新的神断指令')
    .usage(`神断资源：
    cn.shindanmaker.com`)
    .example(`添加神断 1116736 OC生成器 image
    添加神断 1116736 OC生成器 text`)
    .action(async ({ session }, shindanId, command, mode: MakeShindanMode = 'image') => {
      // 检测必选参数是否存在
      if (!shindanId || !command) {
        return `请输入必选的 shindanId 和 command 参数！

指令格式：
    添加神断 <shindanId> <command> [mode]

使用示例：
    添加神断 1116736 OC生成器 image
    添加神断 1116736 OC生成器 text

神断资源：
    cn.shindanmaker.com`
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(mode)) {
        return `参数 mode 不是有效的 MakeShindanMode 类型，请输入 image 或 text 中的一个。`
      }
      // 检测神断是否存在
      const result = await isShindanIdExist(ctx, shindanId)
      if (result.exist) {
        await session.send(`该神断已存在！神断指令为：${result.command}`)
      } else {
        await ctx.model.create('shindan_commands', { shindanId: shindanId, command: command, mode: mode })
        // 获取所有神断指令
        shindanCommands = await ctx.model.get('shindan_commands', {});
        shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
        await session.send(`添加成功！新的神断指令为：${command}`)
      }
    })
  ctx.command('shindan/删除神断 <command>', '删除已有的神断指令')
    .example(`删除神断 今天是什么少女`)
    .action(async ({ session }, command) => {
      if (!command) {
        return `请输入必选的 command 参数！
        
指令格式：
    删除神断 <command> ~

使用示例：
    删除神断 今天是什么少女`
      }
      const result = await isCommandExist(ctx, command)
      if (result) {
        await ctx.model.remove('shindan_commands', { command: command })
        // 获取所有神断指令
        shindanCommands = await ctx.model.get('shindan_commands', {});
        shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
        await session.send(`删除成功！`)
      } else {
        await session.send(`该神断不存在，无法删除！`)
      }
    })
  ctx.command('shindan/修改神断 <command> <newCommand>', '修改已有的神断指令名')
    .example(`修改神断 今天是什么少女 我是什么少女`)
    .action(async ({ session }, command, newCommand) => {
      if (!command || !newCommand) {
        return `请输入必选的 command 和 newCommand 参数！
        
指令格式：
    修改神断 <command> <newCommand> ~

使用示例：
    修改神断 今天是什么少女 我是什么少女`
      }
      const result = await isCommandExist(ctx, command)
      if (result) {
        await ctx.model.set('shindan_commands', { command: command }, { command: newCommand })
        // 获取所有神断指令
        shindanCommands = await ctx.model.get('shindan_commands', {});
        shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
        await session.send(`修改成功！新的神断指令为：${newCommand}`)
      } else {
        await session.send(`该神断不存在，无法修改！`)
      }
    })
  ctx.command('shindan/设置神断 <command> <mode>', '修改已有的神断模式')
    .example(`设置神断 今天是什么少女 image
    设置神断 今天是什么少女 text`)
    .action(async ({ session }, command, mode: MakeShindanMode) => {
      if (!command || !mode) {
        return `请输入必选的 command 和 mode 参数！
        
指令格式：
    设置神断 <command> <mode> ~

使用示例：
    设置神断 今天是什么少女 image
    设置神断 今天是什么少女 text`
      }
      // 判断 mode 是否为 MakeShindanMode 类型
      if (!isMakeShindanMode(mode)) {
        return `参数 mode 不是有效的 MakeShindanMode 类型，请输入 image 或 text 中的一个。`
      }
      const result = await isCommandExist(ctx, command)
      if (result) {
        await ctx.model.set('shindan_commands', { command: command }, { mode: mode })
        // 获取所有神断指令
        shindanCommands = await ctx.model.get('shindan_commands', {});
        shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
        await session.send(`设置成功！该神断模式为：${mode}`)
      } else {
        await session.send(`该神断不存在，无法设置！`)
      }
    })
  ctx.command('shindan/随机神断 [name:text]', '随机进行一次神断')
    .action(async ({ session }, name: string = session.username) => {
      // 获取所有神断指令
      const shindanCommands = await ctx.model.get('shindan_commands', {});
      interface CommandWithId {
        shindanId: string;
        mode: MakeShindanMode;
      }
      try {
        const randomCommandWithId = getRandomCommandWithId(shindanCommands);
        await session.execute(`神断 ${randomCommandWithId.shindanId} '${name}' ${randomCommandWithId.mode}`);
      } catch (error) {
        logger.error(`为用户${name}执行随机神断错误：`, error);
      }
      function getRandomCommandWithId(shindans: ShindanCommands[]): CommandWithId {
        const randomIndex = Math.floor(Math.random() * shindans.length);
        const { shindanId, mode } = shindans[randomIndex];
        return { shindanId, mode };
      }
    })
  ctx.command('shindan/神断列表', '列出所有神断指令名')
    .option('text', '-t 文字版神断列表')
    .action(async ({ session, options }) => {
      // 获取所有 shindanCommands
      const ShindanCommands = await ctx.model.get('shindan_commands', {})
      // 将 shindanCommands 按照字母顺序升序
      const sortedShindanCommands = ShindanCommands.sort((a, b) => a.command.localeCompare(b.command));
      // 定义分组数量
      const CHUNK_SIZE_RATIO = 1 / 5
      const chunkSize = Math.ceil(sortedShindanCommands.length * CHUNK_SIZE_RATIO)
      // 将数组块分成指定大小的较小数组
      const commandChunks = [];
      for (let i = 0; i < sortedShindanCommands.length; i += chunkSize) {
        commandChunks.push(sortedShindanCommands.slice(i, i + chunkSize));
      }

      let startFrom = 1;
      // 定义一个变量来存储当前的序号
      let currentNumber = 1;
      // let messages = [];
      // 循环遍历每个神断指令列表块
      for (const commandChunk of commandChunks) {
        // 如果存在选项 -t，则发送文字版神断列表，以连续不中断的序号作为标记
        if (options.text) {
          // 生成文字版神断列表
          const textContent = commandChunk.map((command, index) => `${currentNumber + index}. ${command.command}`).join('\n');
          // 将文字消息添加到消息数组中，使用自定义消息节点的格式
          // messages.push({
          //   type: "node",
          //   data: {
          //     name: "神断列表",
          //     uin: "10086",
          //     content: textContent
          //   }
          // });
          // 发送文字
          await session.sendQueued(textContent, 1000);
          // 更新当前的序号
          currentNumber += commandChunk.length;
          continue;
        }
        // 循环结束后，使用API发送合并转发消息，传入群号和消息数组
        // await session.onebot.sendGroupForwardMsg(session.guildId, messages);
        // 生成块的 HTML 内容
        const htmlContent = generateHtmlContent(commandChunk, startFrom);
        // 从HTML内容生成图像缓冲区
        const imageBuffer: Buffer = await generateImage(htmlContent);
        // 发送图片
        await session.sendQueued(h.image(imageBuffer, "image/png"), 1000)
        startFrom += commandChunk.length;
      }

    })

  // 辅助工具函数
  async function isShindanIdExist(ctx: Context, shindanId: string) {
    const result = await ctx.model.get('shindan_commands', { shindanId: shindanId })
    if (result.length === 0) {
      return { exist: false }
    } else {
      const command = result[0].command
      return { exist: true, command }
    }
  }
  async function isCommandExist(ctx: Context, command: string) {
    const result = await ctx.model.get('shindan_commands', { command: command })
    if (result.length === 0) {
      return false
    } else {
      return true
    }
  }
  function isMakeShindanMode(mode: unknown): mode is MakeShindanMode {
    return mode === 'image' || mode === 'text';
  }
  function randomBrowserVersion(): string {
    // 生成一个 2 字节的随机缓冲区
    const buffer = crypto.randomBytes(2);

    // 将缓冲区转换为无符号整数
    const number = buffer.readUInt16BE();

    // 使用第一个字节作为主要版本，第二个字节作为次要版本
    const major = number >> 8;
    const minor = number & 0xff;

    // 返回版本号字符串，格式为 major.minor.0.0
    return `${major}.${minor}.0.0`;
  }
  function randomUserAgent(): string {
    // 为基本用户代理字符串定义一个常量
    const base = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)';

    // 使用 randomBrowserVersion 函数生成随机的 Chrome 版本号
    const chrome = `Chrome/${randomBrowserVersion()}`;

    // 使用 randomBrowserVersion 函数生成随机的Edge版本号
    const edge = `Edg/${randomBrowserVersion()}`;

    // 返回用户代理字符串，格式为基本 chrome safari edge
    return `${base} ${chrome} Safari/537.36 ${edge}`;
  }
  function generateHtmlContent(commandChunk: Pick<ShindanCommands, import("koishi").Keys<ShindanCommands, any>>[], startFrom: number) {
    const BACKGROUND_IMAGE = 'url("https://www.dmoe.cc/random.php")'
    const commandHtml = commandChunk.map((command) => `<li>${command.command}</li>`).join("")
    return `
<!DOCTYPE html>
<html lang="ja">
<head>
<style>
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-image: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.5) 100%), ${BACKGROUND_IMAGE};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120%;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  padding: 20px;
  margin: 0;
  max-width: 120%;
  counter-reset: item ${startFrom - 1};
}
li {
  margin:10px auto;
  text-align:center;
  border-bottom :1px solid rgba(255,255,255,.2);
  padding :15px;
  font-size :50px;
  font-weight :400;
  color :rgba(255,255,255,.9);
  transition :background-color .3s ease;
}
li:last-child{
  border-bottom:none;
}
li:nth-child(even){
  background-color:rgba(255,255,255,.05);
}
li:hover{
  background-color:rgba(255,255,255,.1);
}
li:before{
  content:counter(item) ". ";
  counter-increment:item;
  color:rgba(255,255,255,.6);
}
</style><title>神断</title>
</head>
<body>
<ul>
${commandHtml}
</ul>
</body>
</html>
`
  }

  const browser: Browser = await puppeteer.launch({
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new",
  })

  // 关闭插件时消除插件的副作用
  ctx.on('dispose', async () => {
    await browser.close();
  })

  async function generateImage(htmlContent: string): Promise<Buffer | PromiseLike<Buffer>> {
    // 重用现有的浏览器对象
    const browserWSEndpoint = browser.wsEndpoint();
    const page = await (await puppeteer.connect({ browserWSEndpoint })).newPage();

    // 设置内容并截图
    await page.setContent(htmlContent);
    const image = await page.screenshot({ type: "jpeg", quality: 80, fullPage: true });
    // 关闭页面对象
    await page.close();

    return image;
  }

  // 核心功能部分

  // 定义常量和类型
  const USER_AGENT_SELECTOR = '#shindanInput';
  const SUBMIT_BUTTON_SELECTOR = '#shindanButtonSubmit';
  const RESULT_SELECTOR = '#shindanResult';
  const IMAGE_SELECTOR = '.shindanResult_image';
  const CHART_SELECTOR = '[id^="canvas_"]';
  const CHART_MONITOR_SELECTOR = '.chartjs-render-monitor';

  type FetchImageResult = {
    buffer?: Buffer;
    text: string;
  };

  // 定义一个辅助函数来重试具有指数回退的函数
  async function retry<T>(
    func: () => Promise<T>,
    retries = 3,
    delay = 500,
  ): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < retries; i++) {
      try {
        return await func();
      } catch (error) {
        // 定义一个函数，用于请求一言的 api
        async function requestHitokoto() {
          // 使用fetch方法来发送请求
          const response = await fetch('https://v1.hitokoto.cn/');
          // 判断响应是否成功
          if (response.ok) {
            // 解析响应为json格式
            const data = await response.json();
            // 返回一言的内容
            return data.hitokoto;
          } else {
            // 抛出错误信息
            throw new Error(`请求失败，状态码：${response.status}`);
          }
        }

        // 定义一个函数，用于显示提示词
        async function showTip() {
          try {
            // 调用 requestHitokoto 函数来获取一言
            // 使用重试函数来请求一言的 api
            const hitokoto = await retry(() => requestHitokoto());

            // 记录提示
            logger.error(hitokoto);
          } catch (error) {
            // 记录错误
            logger.error(error.message);
          }
        }
        await showTip();
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, delay * (2 ** i)));
      }
    }
    throw lastError;
  }

  // 定义 fetchImage 函数从 shindanmaker 获取图像或文本
  async function fetchImage(
    userAgent: string,
    shindanId: string,
    name: string,
    mode: MakeShindanMode = 'image',
    navigationTimeout = 0,
  ): Promise<FetchImageResult> {
    // 使用重试函数访问页面
    async function gotoWithRetry(page: Page, url: string) {
      return retry(() => page.goto(url, { waitUntil: 'domcontentloaded' }));
    }

    try {
      // 创建一个新页面并设置用户代理和导航超时
      const page = await browser.newPage();
      await page.setUserAgent(userAgent);
      page.setDefaultNavigationTimeout(navigationTimeout);

      // 读取页面时不设置超时
      page.setDefaultTimeout(0);
      // 用给定的 id 访问 shindanmaker 网站
      await gotoWithRetry(page, `https://shindanmaker.com/${shindanId}`);
      await page.evaluate((name, userAgentSelector, submitButtonSelector) => {
        // 清除输入字段
        (document.querySelector(userAgentSelector) as HTMLInputElement).value = "";
        // 在输入字段中键入名称
        (document.querySelector(userAgentSelector) as HTMLInputElement).value = name;
        // 单击提交按钮
        (document.querySelector(submitButtonSelector) as HTMLInputElement).click();
      }, name, USER_AGENT_SELECTOR, SUBMIT_BUTTON_SELECTOR);

      // 等待导航完成
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

      // 等待结果元素出现
      await page.waitForSelector(RESULT_SELECTOR, { visible: true });

      // 如果模式是 image
      if (mode === 'image') {
        const [hasImage, hasChart] = await Promise.all([
          page.$(IMAGE_SELECTOR),
          page.$(CHART_SELECTOR)
        ]);
        // 检查页面上是否有 image
        if (hasImage) {
          // 等待页面完全加载
          await page.waitForFunction(() => document.readyState === 'complete');
        }
        // 检查页面上是否有图表
        if (hasChart) {
          // 等待所有图表元素出现在页面上
          await page.waitForSelector(CHART_MONITOR_SELECTOR, { visible: true });
        }
      }

      // 定义一个 helper 函数来从页面中删除 shindan 效果
      async function removeShindanEffects(page: Page, type: string) {
        await page.evaluate((type) => {
          // 查找具有 “shindanEffects” 类和特定数据模式的所有 span 元素
          const elements = document.querySelectorAll(`span.shindanEffects[data-mode="${type}"]`);
          elements.forEach((element) => {
            // 查找下一个 noscript 元素
            const noscript = element.nextElementSibling;
            if (noscript && noscript.tagName.toLowerCase() === 'noscript') {
              // 用它的第一个子元素替换 noscript 元素
              noscript.replaceWith(noscript.firstElementChild);
            }
            // 移除span元素
            element.remove();
          });
        }, type);
      }


      // 从页面中删除类型为 “ef_shuffle” 的 shindan 效果
      await removeShindanEffects(page, 'ef_shuffle');

      let buffer: Buffer;
      let text: string;
      if (mode === 'image') {
        // 从页面中隐藏图像不需要的一些元素
        await page.evaluate(() => {
          const SELECTORS_TO_HIDE = [
            '.navbar.navbar-expand.pr-0',
            '#head-shindan-title.container-fluid.px-0.border-bottom.bg-light.font-110.font-weight-bold.fixed-top',
          ];
          SELECTORS_TO_HIDE.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
              // 类型断言：element 作为 HTMLElement
              (element as HTMLElement).style.display = 'none';
            });
          });
        });

        // 获取包含标题和结果的元素
        const element = await page.$('#title_and_result');

        // 获取元素的边界框
        const elementBox = await element.boundingBox();
        // 根据配置项设置图片质量
        if (config.isEnableImageCompression) {
          // 截取带有 clip 选项的元素的屏幕截图
          buffer = await element.screenshot({
            type: "jpeg",
            quality: config.shindanPictureQuality,
            clip: elementBox,
          }) as Buffer;
        } else {
          // 截取带有 clip 选项的元素的屏幕截图
          buffer = await element.screenshot({
            type: "png",
            clip: elementBox,
          }) as Buffer;
        }

      }
      // 获取结果元素的文本内容
      text = await page.$eval(RESULT_SELECTOR, (el) => el.textContent);

      // 关闭页面
      await page.close();

      // 返回缓冲区和文本作为结果
      return { buffer, text };
    } catch (error) {
      logger.error('获取图像错误：', error);
      return { text: '获取图像错误：' + error.message };
    }
  }

}

let shindanCommands: Pick<ShindanCommands, Keys<ShindanCommands, any>>[]
let shindanCommandMap: Map<string, Pick<ShindanCommands, Keys<ShindanCommands, any>>>

async function registerEventEmitter(ctx: Context) {
  // 获取所有神断指令
  shindanCommands = await ctx.model.get('shindan_commands', {});
  shindanCommandMap = new Map(shindanCommands.map(record => [record.command, record]));
  // 处理神断命令的函数
  const handleShindanCommand = async (command: string, content: string, session: any) => {
    const commandContent = command;
    const shindanCommand = shindanCommandMap.get(commandContent);
    if (shindanCommand) {
      const name = (content)
        ? content
        : session.username;
      await session.execute(`神断 ${shindanCommand.shindanId} '${name}' ${shindanCommand.mode}`);
    }
  };

  ctx.on('message', async (session) => {
    // 使用正则表达式匹配第一个空格之前的内容
    const command = session.content.match(/^[^\s]+/)?.[0];
    // 使用正则表达式匹配并删除第一个空格之前的内容
    let content = session.content.replace(/^[^\s]+\s*/, '');
    if (shindanCommandMap.has(command)) {
      await handleShindanCommand(command, content, session);
    }
  })


}