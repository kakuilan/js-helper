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

export default {};
