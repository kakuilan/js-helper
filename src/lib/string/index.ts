import _ from 'lodash';
import sp from 'sprintf-js';

import validate from '../validate';

/**
 * 去除字符串前后空格
 * @param {string} v 变量
 * @returns {string}
 */
export function trim(v: string): string {
  return _.trim(v, ' \t\n\r\v\f\0\x0B　');
}

/**
 * 将字符串转为utf8编码的长度
 * @param {string} v 变量
 * @returns {number}
 */
export function utf8Length(v: string): number {
  return ~-encodeURI(v).split(/%..|./).length;
}

/**
 * 格式化字符串
 * @param {string} format 格式
 * @param {any[]} args 其他参数
 */
export function sprintf(format: string, ...args: any[]): string {
  return sp.sprintf(format, ...args);
}

/**
 * 返回相对应于 ascii码 所指定的单个字符
 * @param {number} v
 * @returns {string}
 */
export function chr(v: number): string {
  if (!validate.isInteger(v)) {
    return '';
  }

  return String.fromCharCode(v);
}

/**
 * 转换字符串第一个字节为 0-255 之间的值
 * @param {string} v
 * @returns {number}
 */
export function ord(v: string): number {
  return v.charCodeAt(0);
}

/**
 * 字符串转[utf8]字节数组.
 * js版本参考 www.npmjs.com/package/utf8-string-bytes
 * ts版本参考 gitlab.com/hmajid2301/utf8-to-bytes
 * @param {string} v
 * @returns {number[]}
 */
export function str2Bytes(v: string): number[] {
  const out: number[] = [];
  let p = 0;
  for (let i = 0; i < v.length; i++) {
    let c = v.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = (c >> 6) | 192;
      out[p++] = (c & 63) | 128;
    } else if (
      (c & 0xfc00) === 0xd800 &&
      i + 1 < v.length &&
      (v.charCodeAt(i + 1) & 0xfc00) === 0xdc00
    ) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (v.charCodeAt(++i) & 0x03ff);
      out[p++] = (c >> 18) | 240;
      out[p++] = ((c >> 12) & 63) | 128;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    } else {
      out[p++] = (c >> 12) | 224;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    }
  }
  return out;
}

/**
 * str2Bytes别名
 * @param {string} v
 * @returns {number[]}
 */
export function str2Utf8Arr(v: string): number[] {
  return str2Bytes(v);
}

/**
 * [utf8]字节数组转字符串
 * @param {number[]} bytes
 * @returns {string}
 */
export function bytes2Str(bytes: number[]): string {
  const out = [];
  let pos = 0,
    c = 0;
  while (pos < bytes.length) {
    const c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u =
        (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
        0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode(
        ((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
      );
    }
  }
  return out.join('');
}

/**
 * bytes2Str的别名
 * @param {number[]} v
 * @returns {string}
 */
export function utf8Arr2Str(v: number[]): string {
  return bytes2Str(v);
}

/**
 * 生成随机字串
 * @param {number} len 长度
 * @param {number} type 字串类型:1 不区分大小写的字母, 2 数字, 3 大写字母, 4 小写字母, 5 中文, 0 数值和字母
 * @param {string} addChars 额外的随机字符
 * @returns {string}
 */
export function randomString(
  len: number = 6,
  type: number = 0,
  addChars: string = '',
): string {
  let res = '',
    chars = '';

  switch (type) {
    case 1:
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      break;
    case 2:
      chars = '0123456789';
      break;
    case 3:
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
    case 4:
      chars = 'abcdefghijklmnopqrstuvwxyz';
      break;
    case 5:
      chars =
        '们以我到他会作时要动国产的一是工就年阶义发成部民可出能方进在了不和有大这主中人上为来分生对于学下级地个用同行面说种过命度革而多子后自社加小机也经力线本电高量长党得实家定深法表着水理化争现所二起政三好十战无农使性前等反体合斗路图把结第里正新开论之物从当两些还天资事队批点育重其思与间内去因件日利相由压员气业代全组数果期导平各基或月毛然如应形想制心样干都向变关问比展那它最及外没看治提五解系林者米群头意只明四道马认次文通但条较克又公孔领军流入接席位情运器并飞原油放立题质指建区验活众很教决特此常石强极土少已根共直团统式转别造切九你取西持总料连任志观调七么山程百报更见必真保热委手改管处己将修支识病象几先老光专什六型具示复安带每东增则完风回南广劳轮科北打积车计给节做务被整联步类集号列温装即毫知轴研单色坚据速防史拉世设达尔场织历花受求传口断况采精金界品判参层止边清至万确究书术状厂须离再目海交权且儿青才证低越际八试规斯近注办布门铁需走议县兵固除般引齿千胜细影济白格效置推空配刀叶率述今选养德话查差半敌始片施响收华觉备名红续均药标记难存测士身紧液派准斤角降维板许破述技消底床田势端感往神便贺村构照容非搞亚磨族火段算适讲按值美态黄易彪服早班麦削信排台声该击素张密害侯草何树肥继右属市严径螺检左页抗苏显苦英快称坏移约巴材省黑武培著河帝仅针怎植京助升王眼她抓含苗副杂普谈围食射源例致酸旧却充足短划剂宣环落首尺波承粉践府鱼随考刻靠够满夫失包住促枝局菌杆周护岩师举曲春元超负砂封换太模贫减阳扬江析亩木言球朝医校古呢稻宋听唯输滑站另卫字鼓刚写刘微略范供阿块某功套友限项余倒卷创律雨让骨远帮初皮播优占死毒圈伟季训控激找叫云互跟裂粮粒母练塞钢顶策双留误础吸阻故寸盾晚丝女散焊功株亲院冷彻弹错散商视艺灭版烈零室轻血倍缺厘泵察绝富城冲喷壤简否柱李望盘磁雄似困巩益洲脱投送奴侧润盖挥距触星松送获兴独官混纪依未突架宽冬章湿偏纹吃执阀矿寨责熟稳夺硬价努翻奇甲预职评读背协损棉侵灰虽矛厚罗泥辟告卵箱掌氧恩爱停曾溶营终纲孟钱待尽俄缩沙退陈讨奋械载胞幼哪剥迫旋征槽倒握担仍呀鲜吧卡粗介钻逐弱脚怕盐末阴丰雾冠丙街莱贝辐肠付吉渗瑞惊顿挤秒悬姆烂森糖圣凹陶词迟蚕亿矩康遵牧遭幅园腔订香肉弟屋敏恢忘编印蜂急拿扩伤飞露核缘游振操央伍域甚迅辉异序免纸夜乡久隶缸夹念兰映沟乙吗儒杀汽磷艰晶插埃燃欢铁补咱芽永瓦倾阵碳演威附牙芽永瓦斜灌欧献顺猪洋腐请透司危括脉宜笑若尾束壮暴企菜穗楚汉愈绿拖牛份染既秋遍锻玉夏疗尖殖井费州访吹荣铜沿替滚客召旱悟刺脑措贯藏敢令隙炉壳硫煤迎铸粘探临薄旬善福纵择礼愿伏残雷延烟句纯渐耕跑泽慢栽鲁赤繁境潮横掉锥希池败船假亮谓托伙哲怀割摆贡呈劲财仪沉炼麻罪祖息车穿货销齐鼠抽画饲龙库守筑房歌寒喜哥洗蚀废纳腹乎录镜妇恶脂庄擦险赞钟摇典柄辩竹谷卖乱虚桥奥伯赶垂途额壁网截野遗静谋弄挂课镇妄盛耐援扎虑键归符庆聚绕摩忙舞遇索顾胶羊湖钉仁音迹碎伸灯避泛亡答勇频皇柳哈揭甘诺概宪浓岛袭谁洪谢炮浇斑讯懂灵蛋闭孩释乳巨徒私银伊景坦累匀霉杜乐勒隔弯绩招绍胡呼痛峰零柴簧午跳居尚丁秦稍追梁折耗碱殊岗挖氏刃剧堆赫荷胸衡勤膜篇登驻案刊秧缓凸役剪川雪链渔啦脸户洛孢勃盟买杨宗焦赛旗滤硅炭股坐蒸凝竟陷枪黎救冒暗洞犯筒您宋弧爆谬涂味津臂障褐陆啊健尊豆拔莫抵桑坡缝警挑污冰柬嘴啥饭塑寄赵喊垫丹渡耳刨虎笔稀昆浪萨茶滴浅拥穴覆伦娘吨浸袖珠雌妈紫戏塔锤震岁貌洁剖牢锋疑霸闪埔猛诉刷狠忽灾闹乔唐漏闻沈熔氯荒茎男凡抢像浆旁玻亦忠唱蒙予纷捕锁尤乘乌智淡允叛畜俘摸锈扫毕璃宝芯爷鉴秘净蒋钙肩腾枯抛轨堂拌爸循诱祝励肯酒绳穷塘燥泡袋朗喂铝软渠颗惯贸粪综墙趋彼届墨碍启逆卸航衣孙龄岭骗休借';
      break;
    case 0:
    default:
      // 默认去掉了容易混淆的字符oOLl和数字01，要添加请使用addChars参数
      chars = 'ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
      break;
  }

  if (addChars.length > 0) {
    chars += addChars;
  }

  //位数过长重复字符串一定次数
  const diff = len / chars.length;
  if (diff > 1) {
    chars = _.repeat(chars, Math.ceil(diff));
  }

  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return res;
}

/**
 * 获取文件扩展名
 * @param {string} v
 * @returns {string}
 */
export function getFileExt(v: string): string {
  if (v == '') {
    return '';
  }

  const a = v.split('?')[0].split('#')[0].split('.');
  if (a.length === 1 || (a[0] === '' && a.length === 2)) {
    return '';
  }

  const r = a.pop();
  return r ? r.toLowerCase() : '';
}

export default {
  trim,
  utf8Length,
  sprintf,
  chr,
  ord,
  str2Bytes,
  bytes2Str,
  str2Utf8Arr,
  utf8Arr2Str,
  randomString,
  getFileExt,
};
