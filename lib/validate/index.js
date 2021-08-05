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

