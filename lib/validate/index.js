import Kreg from "../regular"
import fnIsBuffer from "lodash/isBuffer"

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
 * 变量是否对象
 * @param v
 * @returns {boolean}
 */
function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]'
}


/**
 * 变量是否是一个纯粹的对象
 * 如:
 * isObjectPlain([]);//false
 * isObjectPlain({});//true
 * @param v
 * @returns {boolean}
 */
function isObjectPlain(v) {
    return v && Object.prototype.toString.call(v) === '[object Object]' && 'isPrototypeOf' in v
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
 * 是否正则对象
 * @param v
 * @returns {boolean}
 */
function isRegExp(v) {
    return Object.prototype.toString.call(v) === '[object RegExp]';
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
 * 变量是否布尔值
 * @param v
 * @returns {boolean}
 */
function isBoolean(v) {
    //return Object.prototype.toString.call(v) === '[object Boolean]'
    return v === true || v === false
}

/**
 * 变量是否邮箱
 * @param v
 * @returns {boolean}
 */
function isEmail(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternEmail.test(v)
}

/**
 * 变量是否URL
 * 参考：
 * https://stackoverflow.com/questions/30931079/validating-a-url-in-node-js
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param v
 * @returns {boolean}
 */
function isUrl(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternUrl.test(v)
}

/**
 * 变量是否中国手机号
 * @param v
 * @returns {boolean}
 */
function isMobileCn(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternMobileCn.test(v)
}

/**
 * 变量是否中文字符串
 * @param v
 * @returns {boolean}
 */
function isChinese(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternChinese.test(v)
}

/**
 * 变量是否英文字符串
 * @param v
 * @returns {boolean}
 */
function isEnglish(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternAlpha.test(v)
}

/**
 * 变量是否英文或数字字符串
 * @param v
 * @returns {boolean}
 */
function isEngNum(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternAlphaNum.test(v)
}

/**
 * 变量是否单词(英文、数字和_)
 * @param v
 * @returns {boolean}
 */
function isWord(v) {
    if (typeof v !== 'string') v = String(v)
    return Kreg.patternWord.test(v)
}

/**
 * 变量是否null
 * @param v
 * @returns {boolean}
 */
function isNull(v) {
    return v === null;
}

/**
 * 变量是否undefined
 * @param val
 * @returns {boolean}
 */
function isUndefined(val) {
    return val === undefined;
}

/**
 * 变量是否为空
 * @param v
 * @returns {boolean}
 */
function isEmpty(v) {
    if (v === undefined || v === null || v === '') {
        return true;
    } else if (isArray(v)) {
        return v.length === 0;
    } else if (isObject(v)) {
        return Object.keys(v).length === 0;
    }

    return false;
}

/**
 * 是否十六进制字符码
 * @param c
 * @returns {boolean}
 */
function isHexCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
        ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
        ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

/**
 * 是否八进制字符码
 * @param c
 * @returns {boolean}
 */
function isOctCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

/**
 * 是否十进制字符码
 * @param c
 * @returns {boolean}
 */
function isDecCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

/**
 * 是否二进制对象
 * @param v
 * @returns {*}
 */
function isBuffer(v) {
    return fnIsBuffer(v)
}

/**
 * 比较两个值是否相等
 * @param v
 * @param o
 * @returns {boolean}
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, object);
 * // => true
 *
 * _.isEqual(object, other);
 * // => false
 *
 * _.isEqual('a', 'a');
 * // => true
 *
 * _.isEqual('a', Object('a'));
 * // => false
 *
 * _.isEqual(NaN, NaN);
 * // => true
 */
function isEqual(v, o) {
    return v === o || (v !== v && o !== o);
}

/**
 * 是否promise对象
 * @param v
 * @returns {boolean}
 */
function isPromise(v) {
    return !!v  //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
        && (typeof v === 'object' || typeof v === 'function') // 初始promise 或 promise.then返回的
        && typeof v.then === 'function';
}

export default {
    isString,
    isArray,
    isObject,
    isObjectPlain,
    isFunction,
    isRegExp,
    isNumeric,
    isInteger,
    isFloat,
    isBoolean,
    isEmail,
    isUrl,
    isMobileCn,
    isChinese,
    isEnglish,
    isEngNum,
    isWord,
    isNull,
    isUndefined,
    isEmpty,
    isHexCode,
    isOctCode,
    isDecCode,
    isBuffer,
    isEqual,
    isPromise,
}
