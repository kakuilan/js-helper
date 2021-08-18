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


export default {
    sum,
    average,
}
