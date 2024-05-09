import { slice, split } from 'lodash';
import qs from 'qs';
import parse from 'url-parse';

import validate from '../validate';

/**
 * 将文件转为base64
 * @param {File} f 文件对象
 * @returns {Promise<string | ArrayBuffer>}
 */
export function fileToBase64(f: File): Promise<string | ArrayBuffer> {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    let res: string | ArrayBuffer | null = null;
    reader.readAsDataURL(f);
    reader.onload = function () {
      res = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(res ?? '');
    };
  });
}

/**
 * 将图片转为base64,并压缩
 * @param {File} file 图片文件对象
 * @param {number} [resize=1] 缩放比例0-1
 * @param {number} [encoderOptions=0.8] canvas转图片时，图片质量比例0-1
 * @return {Promise<string>} 返回图片base64字符串
 */
export function imgToBase64(
  file: File,
  resize: number = 1,
  encoderOptions: number = 0.8,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          context.scale(resize, resize);
          canvas.width = img.width * resize;
          canvas.height = img.height * resize;
          //缩小画布，毕竟手机拍下来的图片都是几千像素乘几千像素的大小
          context.drawImage(img, 0, 0, img.width * resize, img.height * resize);
          //canvas生成后通过toDataURL获取canvas 处理后的其base64码，并自定义其画质，此处是0.5
          const imgBase64 = canvas.toDataURL(file.type, encoderOptions);
          resolve(imgBase64);
        } else {
          resolve('');
        }
      };
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 从URL中获取站点网址
 * @param {string} url
 * @returns {string}
 */
export function getSiteUrl(url: string): string {
  if (validate.isEmpty(url)) {
    url = window?.location?.href ?? '';
  } else if (url.indexOf('//') === 0) {
    url = 'https:' + url;
  }

  if (!validate.isUrl(url)) {
    return '';
  }

  const obj = parse(url, true);

  return obj.origin;
}

/**
 * 从URL中获取域名
 * @param {string} url
 * @param {boolean} firstLevel 是否获取一级域名,如:abc.test.com取test.com
 * @returns {Url.hostname|string}
 */
export function getDomain(url: string, firstLevel: boolean = false): string {
  if (validate.isEmpty(url)) {
    url = window.location.href;
  } else if (url.indexOf('//') === 0) {
    url = 'https:' + url;
  }

  if (!validate.isUrl(url)) {
    return '';
  }

  const obj = parse(url, true);
  let res = obj.host;
  if (firstLevel) {
    const arr = split(obj.host, '.');
    if (arr.length >= 2) {
      const ret = slice(arr, arr.length - 2);
      res = ret.join('.');
    }
  }

  return res;
}

/**
 * 从Query中获取参数
 * @param {string} name 参数名,为空时将取整个参数对象
 * @param {string} url URL地址
 * @param {boolean} chkHash 当query参数为空时,是否检查哈希串(即为#号后面)
 * @returns {null | string | string[] | qs.ParsedQs | qs.ParsedQs[]}
 */
export function getQueryByName(
  name: string,
  url: string,
  chkHash: boolean = true,
): null | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
  if (validate.isEmpty(url)) {
    url = window?.location?.href ?? '';
  }

  let res: null | string | string[] | qs.ParsedQs | qs.ParsedQs[] = '';
  let ret: null | string | string[] | qs.ParsedQs | qs.ParsedQs[] = null;
  let str = null;
  const obj = parse(url, true);

  if (!validate.isEmpty(obj.query)) {
    res = obj.query;
  } else if (chkHash && !validate.isEmpty(obj.hash)) {
    str = obj.hash;
    const idx = str.indexOf('?');
    if (idx !== -1) {
      str = str.substring(idx + 1);
    }
    res = qs.parse(str, { ignoreQueryPrefix: true });
  }

  if (name && typeof res == 'object' && res !== null) {
    ret = res[name] ?? null;
  } else {
    ret = res;
  }

  return ret;
}

export default {
  fileToBase64,
  imgToBase64,
  getSiteUrl,
  getDomain,
  getQueryByName,
};
