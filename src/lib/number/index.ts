import validate from '../validate';

/**
 * 对数列求和,忽略非数值
 * @param {number[]} v 变量
 * @returns {number}
 */
export function sum(...v: number[]): number {
  let res = 0;
  for (let i = 0; i < v.length; i++) {
    if (validate.isNumeric(v[i])) {
      res += v[i];
    }
  }

  return res;
}

/**
 * 对数列求平均值,忽略非数值
 * @param {number[]} v 变量
 * @returns {number}
 */
export function average(...v: number[]): number {
  let res = 0,
    count = 0,
    total = 0;
  for (let i = 0; i < v.length; i++) {
    if (validate.isNumeric(v[i])) {
      total += v[i];
      count++;
    }
  }

  if (count > 0) {
    res = total / count;
  }

  return res;
}

/**
 * 基础log计算
 * @param {number} x 数值
 * @param {number} y 开N次方
 * @returns {number}
 */
export function getBaseLog(x: number, y: number): number {
  return Math.log(x) / Math.log(y);
}

/**
 * 求以 base 为底 num 的对数临近值
 * @param {number} num 非负数
 * @param {number} base 底数
 * @param {boolean} left 是否向左取整
 * @returns {number}
 */
export function nearLogarithm(
  num: number,
  base: number = 2,
  left: boolean = true,
): number {
  if (!validate.isNumeric(num) || num < 0) {
    throw new Error('The num must be non-negative!');
  } else if (!validate.isNumeric(base) || base <= 0) {
    throw new Error('The base must be a positive integer!');
  }

  const res = getBaseLog(num, base);
  return left ? parseInt(res.toString()) : parseInt(Math.ceil(res).toString());
}

/**
 * 将自然数按底数进行拆解
 * @param {number} num 自然数
 * @param {number} base 底数
 * @returns {number[]}
 */
export function splitNaturalNum(num: number, base: number): number[] {
  if (!validate.isNaturalNum(num)) {
    throw new Error('Invalid num:' + num);
  } else if (!validate.isInteger(base) || base <= 0) {
    throw new Error('Invalid base:' + base);
  }

  const res: number[] = [];
  while (num > base) {
    const n = nearLogarithm(num, base, true);
    const child = Math.pow(base, n);
    num -= child;
    res.push(child);
  }

  if (num > 0 || (num === 0 && validate.isEmpty(res))) {
    res.push(num);
  }

  return res;
}

export default {
  sum,
  average,
  getBaseLog,
  nearLogarithm,
  splitNaturalNum,
};
