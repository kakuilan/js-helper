import _ from 'lodash';

import string from '../string';
import validate from '../validate';

/**
 * 将变量转为字符串
 * @param {any} v 变量
 * @returns {string}
 */
export function toString(v: any): string {
  return _.toString(v);
}

/**
 * 将变量转为数值类型
 * @param {any} v 变量
 * @returns {number}
 */
export function toNumber(v: any): number {
  return _.toNumber(v);
}

/**
 * 将变量转为数组
 * @param {any} v 变量
 * @returns {any[]}
 */
export function toArray(v: any): any[] {
  return _.toArray(v);
}

/**
 * 将变量转为对象
 * @param {any} v 变量
 * @returns {object}
 */
export function toObject(v: any): object {
  if (v === null || v === undefined) {
    return {};
  }

  return Object(v);
}

/**
 * 将字符串转为十六进制
 * @param {any} v 变量
 * @returns {string}
 */
export function strToHex(v: any): string {
  if (!validate.isString(v)) {
    v = toString(v);
  }

  if (v === '') {
    return '';
  }

  const res = [];
  res.push('0x');
  for (let i = 0, l = v.length; i < l; i++) {
    res.push(v.charCodeAt(i).toString(16));
  }
  return res.join('');
}

/**
 * 将十六进制转为字符串
 * @param {any} v 变量
 * @returns {string}
 */
export function hexToStr(v: any): string {
  if (!validate.isString(v)) {
    v = toString(v);
  }

  let str = string.trim(v);
  if (str.substring(0, 2).toLowerCase() === '0x') {
    str = str.substring(2);
  }

  if (str.length % 2 !== 0) {
    //无效的十六进制
    throw new Error('Invalid hexadecimal:' + v);
  }

  let code;
  const res = [];
  for (let i = 0; i < str.length; i = i + 2) {
    code = parseInt(str.substring(i, i + 2), 16); // ASCII Code Value
    res.push(String.fromCharCode(code));
  }
  return res.join('');
}

/**
 * 将IP转换为整型
 * @param {string} v 变量
 * @returns {number}
 */
export function ipToInt(v: string): number {
  let num = 0;
  const ip = v.split('.');
  num =
    Number(ip[0]) * 256 * 256 * 256 +
    Number(ip[1]) * 256 * 256 +
    Number(ip[2]) * 256 +
    Number(ip[3]);
  num = num >>> 0;
  return num;
}

/**
 * 将整型转换为IP
 * @param {number} v 变量
 * @returns {string}
 */
export function intToIP(v: number): string {
  const tt = [];
  tt[0] = (v >>> 24) >>> 0;
  tt[1] = ((v << 8) >>> 24) >>> 0;
  tt[2] = (v << 16) >>> 24;
  tt[3] = (v << 24) >>> 24;
  const res =
    String(tt[0]) +
    '.' +
    String(tt[1]) +
    '.' +
    String(tt[2]) +
    '.' +
    String(tt[3]);
  return res;
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
};
