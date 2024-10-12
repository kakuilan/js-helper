import { isArrayLike, isObjectLike } from 'lodash';
import fnIsBuffer from 'lodash/isBuffer';

import reg from '../regular';

/**
 * 变量是否字符串
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isString(v: any): boolean {
  return typeof v === 'string' || v instanceof String;
}

/**
 * 变量是否数组
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isArray(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Array]';
}

/**
 * 变量是否对象
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isObject(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Object]';
}

/**
 * 变量是否是一个纯粹的对象
 * 如:
 * isObjectPlain([]); //false
 * isObjectPlain({}); //true
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isObjectPlain(v: any): boolean {
  try {
    return Boolean(
      v &&
        Object.prototype.toString.call(v) === '[object Object]' &&
        'isPrototypeOf' in v,
    );
  } catch (e) {
    return false;
  }
}

/**
 * 变量是否函数
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isFunction(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Function]';
}

/**
 * 是否正则对象
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isRegExp(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object RegExp]';
}

/**
 * 变量是否数值
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isNumeric(v: any): boolean {
  return !isNaN(parseFloat(v)) && isFinite(v);
}

/**
 * 变量是否整数
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isInteger(v: any): boolean {
  return Number(v) === v && v % 1 === 0;
}

/**
 * 变量是否浮点数
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isFloat(v: any): boolean {
  return Number(v) === v && v % 1 !== 0;
}

/**
 * 变量是否布尔值
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isBoolean(v: any): boolean {
  return v === true || v === false;
}

/**
 * 变量是否邮箱
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isEmail(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  return reg.patternEmail.test(v);
}

/**
 * 变量是否URL
 * 参考：
 * https://stackoverflow.com/questions/30931079/validating-a-url-in-node-js
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isUrl(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  try {
    return Boolean(new URL(v));
  } catch (e) {
    return false;
  }
}

/**
 * 变量是否中国手机号
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isMobileCn(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  return reg.patternMobileCn.test(v);
}

/**
 * 变量是否中文字符串
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isChinese(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  return reg.patternChinese.test(v);
}

/**
 * 变量是否英文字符串
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isEnglish(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  return reg.patternAlpha.test(v);
}

/**
 * 变量是否英文或数字字符串
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isEngNum(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  return reg.patternAlphaNum.test(v);
}

/**
 * 变量是否单词(英文、数字和_)
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isWord(v: any): boolean {
  if (typeof v !== 'string') {
    v = String(v);
  }
  return reg.patternWord.test(v);
}

/**
 * 变量是否null
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isNull(v: any): boolean {
  return v === null && 'object' === typeof v;
}

/**
 * 变量是否undefined
 * @param {any} v 变量al
 * @returns {boolean}
 */
export function isUndefined(v: any): boolean {
  return v === undefined && 'undefined' === typeof v;
}

/**
 * 变量是否为空
 * 如：null,undefined,空字符串,空数组,空对象
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isEmpty(v: any): boolean {
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
 * @param {number} c 字符码
 * @returns {boolean}
 */
export function isHexCode(c: number): boolean {
  return (
    (0x30 /* 0 */ <= c && c <= 0x39) /* 9 */ ||
    (0x41 /* A */ <= c && c <= 0x46) /* F */ ||
    (0x61 /* a */ <= c && c <= 0x66) /* f */
  );
}

/**
 * 是否八进制字符码
 * @param {number} c 字符码
 * @returns {boolean}
 */
export function isOctCode(c: number): boolean {
  return 0x30 /* 0 */ <= c && c <= 0x37 /* 7 */;
}

/**
 * 是否十进制字符码
 * @param {number} c 字符码
 * @returns {boolean}
 */
export function isDecCode(c: number): boolean {
  return 0x30 /* 0 */ <= c && c <= 0x39 /* 9 */;
}

/**
 * 是否二进制对象
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isBuffer(v: any): boolean {
  return fnIsBuffer(v);
}

/**
 * 比较两个值是否相等
 * @param {any} v 变量
 * @param {any} o 变量
 * @returns {boolean}
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * isEqual(object, object);
 * // => true
 *
 * isEqual(object, other);
 * // => false
 *
 * isEqual('a', 'a');
 * // => true
 *
 * isEqual('a', Object('a'));
 * // => false
 *
 * isEqual(NaN, NaN);
 * // => true
 */
export function isEqual(v: any, o: any): boolean {
  return v === o || (v !== v && o !== o);
}

/**
 * 是否promise对象
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isPromise(v: any): boolean {
  return (
    !!v && //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
    (typeof v === 'object' || typeof v === 'function') && // 初始promise 或 promise.then返回的
    typeof v.then === 'function'
  );
}

/**
 * instanceof的别名,检查v是否cls的实例
 * @param {any} v 变量
 * @param {any} cls 类名
 * @returns {boolean}
 */
export function objectOf(v: any, cls: any): boolean {
  try {
    return v instanceof cls;
  } catch (e) {
    return false;
  }
}

/**
 * 是否自然数
 * @param {any} v 变量
 * @returns {boolean}
 */
export function isNaturalNum(v: any): boolean {
  if (typeof v !== 'string') v = String(v);
  return reg.patternNaturalNum.test(v);
}

/**
 * 检查haystack是否在needle里面
 * @param {any} needle 数组或对象
 * @param {any} haystack 要查找的值
 * @returns {boolean}
 */
export function inArray(needle: any, haystack: any): boolean {
  let res = false;
  if (isArrayLike(needle)) {
    res = needle.indexOf(haystack) !== -1;
  } else if (isObjectLike(needle)) {
    for (const k in needle) {
      if (needle[k] === haystack) {
        res = true;
        break;
      }
    }
  }

  return res;
}

// isJson 检查变量是否JSON字符串.
export function isJson(text: any): boolean {
  if (typeof text !== 'string') {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  isString,
  isArray,
  isObject,
  isObjectPlain,
  isFunction,
  isArrayLike,
  isObjectLike,
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
  objectOf,
  isNaturalNum,
  inArray,
  isJson,
};
