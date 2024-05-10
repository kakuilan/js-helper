import convert from '../convert';
import string from '../string';
import validate from '../validate';

/**
 * 对象合并
 * @param {JsHelper.Object} target 目标对象
 * @param {JsHelper.Object} source 源对象
 * @returns {JsHelper.Object}
 */
export function objectMerge(
  target: JsHelper.Object,
  source: JsHelper.Object,
): JsHelper.Object {
  if (validate.isObjectPlain(target) && validate.isObjectPlain(source)) {
    let key;
    for (key in source) {
      if (validate.isObjectPlain(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        objectMerge(target[key], source[key]);
      } else {
        // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
}

/**
 * 获取对象大小,字节
 * @param {any} v
 * @returns {number}
 */
export function objectSize(v: any): number {
  if (!validate.isObject(v)) {
    v = convert.toObject(v);
  }

  const j = JSON.stringify(v);
  return string.utf8Length(j);
}

export default {
  objectMerge,
  objectSize,
};
