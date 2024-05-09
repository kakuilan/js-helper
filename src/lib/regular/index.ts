/**
 * 正则模式-邮箱
 * @type {RegExp}
 */
export const patternEmail: RegExp =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * 正则模式-中国手机号
 * @type {RegExp}
 */
export const patternMobileCn: RegExp = /^1[3456789]\d{9}$/;

/**
 * 正则模式-英文字母
 * @type {RegExp}
 */
export const patternAlpha: RegExp = /^[A-Za-z]+$/;

/**
 * 正则模式-中文
 * @type {RegExp}
 */
export const patternChinese: RegExp = /^[\u4e00-\u9fa5]+$/;

/**
 * 正则模式-字母或数字
 * @type {RegExp}
 */
export const patternAlphaNum: RegExp = /^[A-Za-z0-9]+$/;

/**
 * 正则模式-词语,不以下划线开头的中文、英文、数字、下划线
 * @type {RegExp}
 */
export const patternWord: RegExp = /^(?!_)[\u4e00-\u9fa5a-zA-Z0-9_]+$/;

/**
 * 正则模式-IP地址
 * @type {RegExp}
 */
export const patternIp: RegExp =
  /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;

/**
 * 正则模式-端口号
 * @type {RegExp}
 */
export const patternPort: RegExp =
  /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

/**
 * 正则模式-座机号
 * @type {RegExp}
 */
export const patternLandLine: RegExp = /^([0-9]{3,4}-)?[0-9]{7,8}$/;

/**
 * 正则模式-QQ号
 * @type {RegExp}
 */
export const patternQq: RegExp = /^[1-9][0-9]{4,9}$/;

/**
 * 正则模式-身份证号
 * @type {RegExp}
 */
export const patternCardNumber: RegExp = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;

/**
 * 正则模式-客户端-手机
 * @type {RegExp}
 */
export const patternAgentMobile: RegExp = /Android|webOS|Iphone|Ipad/i;

/**
 * 正则模式-客户端-微信
 * @type {RegExp}
 */
export const patternAgentWechat: RegExp = /MicroMessenger/i;

/**
 * 正则模式-客户端-iOS
 * @type {RegExp}
 */
export const patternAgentIOS: RegExp = /(iOS|iPhone|iPad|iPod)/i;

/**
 * 正则模式-客户端-iPhone
 * @type {RegExp}
 */
export const patternAgentIPhone: RegExp = /(iPhone|iPod)/i;

/**
 * 正则模式-客户端-iPad
 * @type {RegExp}
 */
export const patternAgentIPad: RegExp = /iPad/i;

/**
 * 正则模式-客户端-android
 * @type {RegExp}
 */
export const patternAgentAndroid: RegExp = /Android/i;

/**
 * 正则模式-客户端-safari
 * @type {RegExp}
 */
export const patternAgentSafari: RegExp = /version\/[\d.]+.*safari/;

/**
 * 正则模式-空白字符
 * @type {RegExp}
 */
export const patternWhitespace: RegExp =
  /[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]/;

/**
 * 正则模式-自然数
 * @type {RegExp}
 */
export const patternNaturalNum: RegExp = /^(?:0|[1-9][0-9]*)$/;

export default {
  patternEmail,
  patternMobileCn,
  patternChinese,
  patternAlpha,
  patternAlphaNum,
  patternWord,
  patternIp,
  patternPort,
  patternLandLine,
  patternQq,
  patternCardNumber,
  patternAgentMobile,
  patternAgentWechat,
  patternAgentIOS,
  patternAgentIPhone,
  patternAgentIPad,
  patternAgentAndroid,
  patternAgentSafari,
  patternNaturalNum,
};
