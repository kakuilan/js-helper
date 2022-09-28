/**
 * 正则模式-邮箱
 * @type {RegExp}
 */
const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * 正则模式-中国手机号
 * @type {RegExp}
 */
const patternMobileCn = /^1[3456789]\d{9}$/

/**
 * 正则模式-英文字母
 * @type {RegExp}
 */
const patternAlpha = /^[A-Za-z]+$/

/**
 * 正则模式-中文
 * @type {RegExp}
 */
const patternChinese = /^[\u4e00-\u9fa5]+$/

/**
 * 正则模式-字母或数字
 * @type {RegExp}
 */
const patternAlphaNum = /^[A-Za-z0-9]+$/

/**
 * 正则模式-词语,不以下划线开头的中文、英文、数字、下划线
 * @type {RegExp}
 */
const patternWord = /^(?!_)[\u4e00-\u9fa5a-zA-Z0-9_]+$/

/**
 * 正则模式-IP地址
 * @type {RegExp}
 */
const patternIp = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

/**
 * 正则模式-端口号
 * @type {RegExp}
 */
const patternPort = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

/**
 * 正则模式-座机号
 * @type {RegExp}
 */
const patternLandLine = /^([0-9]{3,4}-)?[0-9]{7,8}$/

/**
 * 正则模式-QQ号
 * @type {RegExp}
 */
const patternQq = /^[1-9][0-9]{4,9}$/;

/**
 * 正则模式-身份证号
 * @type {RegExp}
 */
const patternCardNumber = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/

/**
 * 正则模式-客户端-手机
 * @type {RegExp}
 */
const patternAgentMobile = /Android|webOS|Iphone|Ipad/i

/**
 * 正则模式-客户端-微信
 * @type {RegExp}
 */
const patternAgentWechat = /MicroMessenger/i

/**
 * 正则模式-客户端-iOS
 * @type {RegExp}
 */
const patternAgentIOS = /(iOS|iPhone|iPad|iPod)/i

/**
 * 正则模式-客户端-iPhone
 * @type {RegExp}
 */
const patternAgentIPhone = /(iPhone|iPod)/i

/**
 * 正则模式-客户端-iPad
 * @type {RegExp}
 */
const patternAgentIPad = /iPad/i

/**
 * 正则模式-客户端-android
 * @type {RegExp}
 */
const patternAgentAndroid = /Android/i

/**
 * 正则模式-客户端-safari
 * @type {RegExp}
 */
const patternAgentSafari = /version\/[\d\.]+.*safari/

/**
 * 正则模式-空白字符
 * @type {RegExp}
 */
const patternWhitespace = /[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]/

/**
 * 正则模式-自然数
 * @type {RegExp}
 */
const patternNaturalNum = /^(?:0|[1-9][0-9]*)$/

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
}
