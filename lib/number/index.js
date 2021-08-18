import Kvali from "../validate"

/**
 * 对数列求和,忽略非数值
 * @param v
 * @returns {number}
 */
function sum(...v) {
    let res = 0
    for (let i = 0; i < v.length; i++) {
        if (Kvali.isNumeric(v[i])) {
            res += v[i]
        }
    }

    return res
}

/**
 * 对数列求平均值,忽略非数值
 * @param v
 * @returns {number}
 */
function average(...v) {
    let res = 0, count = 0, total = 0
    for (let i = 0; i < v.length; i++) {
        if (Kvali.isNumeric(v[i])) {
            total += v[i]
            count++
        }
    }

    if (count > 0) {
        res = total / count
    }

    return res
}

/**
 * 基础log计算
 * @param x 数值
 * @param y 开N次方
 * @returns {number}
 */
function getBaseLog(x, y) {
    return Math.log(x) / Math.log(y);
}

/**
 * 求以 base 为底 num 的对数临近值
 * @param num 非负数
 * @param base 底数
 * @param left 是否向左取整
 * @returns {number}
 */
function nearLogarithm(num, base = 2, left = true) {
    if (!Kvali.isNumeric(num) || num < 0) {
        throw new Error('The num must be non-negative!')
    } else if (!Kvali.isNumeric(base) || base <= 0) {
        throw new Error('The base must be a positive integer!')
    }

    let res = getBaseLog(num, base)
    return left ? parseInt(res) : parseInt(Math.ceil(res))
}

/**
 * 将自然数按底数进行拆解
 * @param num 自然数
 * @param base 底数
 * @returns {[]}
 */
function splitNaturalNum(num, base) {
    if (!Kvali.isNaturalNum(num)) {
        throw new Error('Invalid num:' + num)
    } else if (!Kvali.isInteger(base) || base <= 0) {
        throw new Error('Invalid base:' + base)
    }

    let res = []
    while (num > base) {
        let n = nearLogarithm(num, base, true)
        let child = Math.pow(base, n)
        num -= child
        res.push(child)
    }

    if (num > 0 || (num === 0 && Kvali.isEmpty(res))) {
        res.push(num)
    }

    return res
}

export default {
    sum,
    average,
    getBaseLog,
    nearLogarithm,
    splitNaturalNum,
}
