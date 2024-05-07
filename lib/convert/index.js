import Kval from "../validate"
import Kstr from "../string"
import fnToString from "lodash/toString"

let _ = require('lodash');

/**
 * 将变量转为字符串
 * @param v
 * @returns {string}
 */
export function toString(v) {
    return fnToString(v)
}

/**
 * 将变量转为数值类型
 * @param v
 * @returns {number}
 */
export function toNumber(v) {
    return _.toNumber(v)
}

/**
 * 将变量转为数组
 * @param v
 * @returns {Array}
 */
export function toArray(v) {
    return _.toArray(v)
}

/**
 * 将变量转为对象
 * @param v
 * @returns {any}
 */
export function toObject(v) {
    return Object(v)
}

/**
 * 将字符串转为十六进制
 * @param v
 * @returns {string}
 */
export function strToHex(v) {
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
export function hexToStr(v) {
    if (!Kval.isString(v)) {
        v = toString(v)
    }

    let str = Kstr.trim(v)
    if (str.substring(0, 2).toLowerCase() === '0x') {
        str = str.substring(2)
    }

    if (str.length % 2 !== 0) {
        //无效的十六进制
        throw new Error('Invalid hexadecimal:' + v)
    }

    let code
    let res = []
    for (let i = 0; i < str.length; i = i + 2) {
        code = parseInt(str.substring(i, i+2), 16); // ASCII Code Value
        res.push(String.fromCharCode(code));
    }
    return res.join('')
}

/**
 * 将IP转换为整型
 * @param v
 * @returns {number}
 */
export function ipToInt(v) {
    let num = 0;
    let ip = v.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
}

/**
 * 将整型转换为IP
 * @param v
 * @returns {string}
 */
export function intToIP(v) {
    let str;
    let tt = [];
    tt[0] = (v >>> 24) >>> 0;
    tt[1] = ((v << 8) >>> 24) >>> 0;
    tt[2] = (v << 16) >>> 24;
    tt[3] = (v << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}

export default {
    toString,
    toNumber,
    toArray,
    toObject,
    strToHex,
    hexToStr,
    ipToInt,
    intToIP,
}
