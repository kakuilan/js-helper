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


export default {
    patternEmail,
    patternMobileCn,
    patternChinese,
    patternAlpha,
    patternAlphaNum,
    patternWord,
}
