import Base64 from 'base64-js';
import { md5 as fnMd5 } from 'js-md5';
import _ from 'lodash';

import constant from '../constant';
import convert from '../convert';
import datetime from '../datetime';
import string from '../string';
import validate from '../validate';

/**
 * md5
 * @param {any} v
 * @returns {string}
 */
export function md5(v: any): string {
  if (!validate.isString(v)) {
    v = convert.toString(v);
  }

  return fnMd5(v).toString();
}

/**
 * url安全的base64_encode
 * @param {string | number[]} v 字符串或字节数组
 * @returns {string}
 */
export function base64UrlEncode(v: string | number[]): string {
  let arr: number[] = [];
  if (_.isArray(v)) {
    arr = v;
  } else {
    if (!validate.isString(v)) {
      v = convert.toString(v);
    }
    arr = string.str2Bytes(v);
  }

  let r = Base64.fromByteArray(Uint8Array.from(arr));
  r = r
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

  return r;
}

/**
 * url安全的base64_decode
 * @param {string} v
 * @param {boolean|undefined} returnArray 是否返回数组
 * @returns {string | number[]}
 */
export function base64UrlDecode(
  v: string,
  returnArray: boolean | undefined = false,
): string | number[] {
  if (!validate.isString(v)) {
    return '';
  }

  const l = v.length;
  const m = (4 - (l % 4)) % 4;
  v = v
    .replace(/-/g, '+') // Convert '-' to '+'
    .replace(/_/g, '/'); // Convert '_' to '/'
  v += '='.repeat(m);

  let r: number[] = [];
  try {
    r = Array.from(Base64.toByteArray(v));
  } catch (e) {
    //console.log('-------base64UrlDecode err:', e)
  }

  if (returnArray) {
    return r;
  } else {
    return string.bytes2Str(r);
  }
}

/**
 * 授权码生成及解码.返回结果为数组,分别是加密/解密的字符串和有效期时间戳.
 * @param {string} str 数据
 * @param {string} key 密钥
 * @param {boolean} encode true为加密,false为解密
 * @param {number|undefined} expiry 有效期/秒,为0时代表永久(100年)
 * @returns {(string|number)[]}
 */
export function authcode(
  str: string,
  key: string,
  encode: boolean = true,
  expiry: number | undefined = 0,
): (string | number)[] {
  if (!validate.isString(str) || str === '') {
    return ['', 0];
  } else if (!encode && str.length < constant.DYNAMIC_KEY_LEN) {
    return ['', 0];
  }

  let exp: number = 0;
  if (expiry === undefined) {
    exp = 0;
  } else {
    exp = parseInt(expiry.toString());
  }

  key = md5(key);
  const now = datetime.nowSecond();
  const keya = key.substring(0, 16);
  const keyb = key.substring(16);
  const keyc = encode
    ? md5(datetime.nowMilli()).substring(32 - constant.DYNAMIC_KEY_LEN)
    : str.substring(0, constant.DYNAMIC_KEY_LEN);
  const keyd = md5(keya + keyc);
  const cryptKey = keya + keyd;
  let expMd5 = '';

  let cryStr: string;
  let data: number[];
  if (encode) {
    if (exp === 0) {
      exp = 3153600000; //100年
    }
    exp += now;
    expMd5 = md5(str + keyb).substring(0, 16);
    cryStr = string.sprintf('%010d', exp) + expMd5 + str;
    data = string.str2Bytes(cryStr);
  } else {
    data = <number[]>(
      base64UrlDecode(str.substring(constant.DYNAMIC_KEY_LEN), true)
    );
  }

  const dataLen = data.length;
  const box = new Array(256);
  const rndkey = [];
  for (let i = 0; i < 256; i++) {
    box[i] = i;
  }
  for (let i = 0; i < 256; i++) {
    rndkey[i] = cryptKey.charCodeAt(i % cryptKey.length);
  }
  let i, j, tmp;
  for (j = i = 0; i < 256; i++) {
    j = (j + box[i] + rndkey[i]) % 256;
    tmp = box[i];
    box[i] = box[j];
    box[j] = tmp;
  }

  let a: number;
  let co: number;
  let it: number;
  let res = '';
  const codes = [];
  for (a = j = i = 0; i < dataLen; i++) {
    a = (a + 1) % 256;
    j = (j + box[a]) % 256;
    tmp = box[a];
    box[a] = box[j];
    box[j] = tmp;
    it = data[i];
    co = it ^ box[(box[a] + box[j]) % 256];
    //res += String.fromCharCode(co)
    codes.push(co);
  }

  if (encode) {
    res = keyc + base64UrlEncode(codes);
    return [res, exp];
  } else {
    res = string.bytes2Str(codes);
    const expTime = parseInt(res.substring(0, 10));
    const ret = res.substring(26);
    expMd5 = md5(ret + keyb).substring(0, 16);
    if (res.length <= 26) {
      return ['', 0];
    } else if (res.substring(10, 26) !== expMd5) {
      return ['', 0];
    }

    if (expTime - now > 0) {
      return [ret, expTime];
    }
    return ['', expTime];
  }
}

/**
 * 简单加密
 * @param {string} str
 * @param {string} key
 * @returns {string}
 */
export function easyEncrypt(str: string, key: string): string {
  if (!validate.isString(str) || str === '') {
    return '';
  }

  let x = 0;
  key = md5(key);
  const data = string.str2Utf8Arr(str);
  const codes = [];
  for (let i = 0; i < data.length; i++) {
    if (x === key.length) {
      x = 0;
    }
    const code = data[i] + (key.charCodeAt(i) % 256);
    codes.push(code);
    x++;
  }

  return key.substring(0, constant.DYNAMIC_KEY_LEN) + base64UrlEncode(codes);
}

/**
 * 简单解密
 * @param {string} str
 * @param {string} key
 * @returns {string}
 */
export function easyDecrypt(str: string, key: string): string {
  if (!validate.isString(str) || str.length < constant.DYNAMIC_KEY_LEN) {
    return '';
  }

  key = md5(key);
  if (
    key.substring(0, constant.DYNAMIC_KEY_LEN) !==
    str.substring(0, constant.DYNAMIC_KEY_LEN)
  ) {
    return '';
  }

  const data = <number[]>(
    base64UrlDecode(str.substring(constant.DYNAMIC_KEY_LEN), true)
  );
  if (data.length === 0) {
    return '';
  }

  let x = 0;
  let c: number, k: number;
  let code;
  const codes = [];
  for (let i = 0; i < data.length; i++) {
    if (x === key.length) {
      x = 0;
    }

    c = data[i];
    k = key.charCodeAt(i);
    if (c < k) {
      code = c + 256 - k;
    } else {
      code = c - k;
    }
    codes.push(code);
    x++;
  }

  return string.bytes2Str(codes);
}

export default {
  md5,
  base64UrlEncode,
  base64UrlDecode,
  authcode,
  easyEncrypt,
  easyDecrypt,
};
