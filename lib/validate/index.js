import Regular from "../regular"

/**
 * 变量是否字符串
 * @param v
 * @returns {boolean}
 */
function isString(v) {
    return typeof v === 'string' || v instanceof String
}

/**
 * 变量是否数组
 * @param v
 * @returns {boolean}
 */
function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]'
}

/**
 * 变量是否是一个纯粹的对象
 * 如:
 * isObject([]);//false
 * isObject({});//true
 * @param v
 * @returns {boolean}
 */
function isObject(v) {
    return v && toString.call(v) === '[object Object]' && 'isPrototypeOf' in v
}

/**
 * 变量是否函数
 * @param v
 * @returns {boolean}
 */
function isFunction(v) {
    return Object.prototype.toString.call(v) === '[object Function]'
}

/**
 * 变量是否数值
 * @param v
 * @returns {boolean}
 */
function isNumeric(v) {
    return !isNaN(parseFloat(v)) && isFinite(v)
}

/**
 * 变量是否整数
 * @param v
 * @returns {boolean}
 */
function isInteger(v) {
    return Number(v) === v && v % 1 === 0
}

/**
 * 变量是否浮点数
 * @param v
 * @returns {boolean}
 */
function isFloat(v) {
    return Number(v) === v && v % 1 !== 0
}

/**
 * 变量是否邮箱
 * @param v
 * @returns {boolean}
 */
function isEmail(v) {
    if (typeof v !== 'string') v = String(v)
    return Regular.patternEmail.test(v)
}

/**
 * 变量是否中国手机号
 * @param v
 * @returns {boolean}
 */
function isMobileCn(v) {
    if (typeof v !== 'string') v = String(v)
    return Regular.patternMobileCn.test(v)
}

/**
 * 变量是否中文字符串
 * @param v
 * @returns {boolean}
 */
function isChinese(v) {
    if (typeof v !== 'string') v = String(v)
    return Regular.patternChinese.test(v)
}

/**
 * 变量是否英文字符串
 * @param v
 * @returns {boolean}
 */
function isEnglish(v) {
    if (typeof v !== 'string') v = String(v)
    return Regular.patternAlpha.test(v)
}

/**
 * 变量是否英文或数字字符串
 * @param v
 * @returns {boolean}
 */
function isEngNum(v) {
    if (typeof v !== 'string') v = String(v)
    return Regular.patternAlphaNum.test(v)
}

/**
 * 变量是否单词(英文、数字和_)
 * @param v
 * @returns {boolean}
 */
function isWord(v) {
    if (typeof v !== 'string') v = String(v)
    return Regular.patternWord.test(v)
}

/**
 * 变量是否为空
 * @param v
 * @returns {boolean}
 */
function isEmpty(v) {
    return v === undefined || v === null || v === '';
}

export default {
    isString,
    isArray,
    isObject,
    isFunction,
    isNumeric,
    isInteger,
    isFloat,
    isEmail,
    isMobileCn,
    isChinese,
    isEnglish,
    isEngNum,
    isWord,
    isEmpty
}
