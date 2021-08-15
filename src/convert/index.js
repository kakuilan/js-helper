import Kval from "../validate"
import Kstr from "../string"
import fnToString from "lodash/toString"

let _ = require('lodash');

/**
 * 将变量转为字符串
 * @param v
 * @returns {string}
 */
function toString(v) {
    return fnToString(v)
}

/**
 * 将变量转为数值类型
 * @param v
 * @returns {number}
 */
function toNumber(v) {
    return _.toNumber(v)
}

/**
 * 将变量转为数组
 * @param v
 * @returns {Array}
 */
function toArray(v) {
    return _.toArray(v)
}

/**
 * 将变量转为对象
 * @param v
 * @returns {any}
 */
function toObject(v) {
    return Object(v)
}

/**
 * 将字符串转为十六进制
 * @param v
 * @returns {string}
 */
function strToHex(v) {
    if (!Kval.isString(v)) {
        v = toString(v)
    }

    if (v === '') {
        return v
    }

    let res = []
    res.push('0x')
    for (let i = 0, l = v.length; i < l; i++) {
        res.push(v.charCodeAt(i).toString(16))
    }
    return res.join('')
}

/**
 * 将十六进制转为字符串
 * @param v
 * @returns {string}
 */
function hexToStr(v) {
    if (!Kval.isString(v)) {
        v = toString(v)
    }

    let str = Kstr.trim(v)
    if (str.substr(0, 2).toLowerCase() === '0x') {
        str = str.substr(2)
    }

    if (str.length % 2 !== 0) {
        //无效的十六进制
        throw new Error('Invalid hexadecimal:' + v)
    }

    let code
    let res = []
    for (let i = 0; i < str.length; i = i + 2) {
        code = parseInt(str.substr(i, 2), 16); // ASCII Code Value
        res.push(String.fromCharCode(code));
    }
    return res.join('')
}

export default {
    toString,
    toNumber,
    toArray,
    toObject,
    strToHex,
    hexToStr,
}
