import Kconv from "../convert"
import Kvali from "../validate"
import Kstr from "../string"

/**
 * 对象合并
 * @param target 目标对象
 * @param source 源对象
 * @returns {*}
 */
export function objectMerge(target, source) {
    if (Kvali.isObjectPlain(target) && Kvali.isObjectPlain(source)) {
        let key;
        for (key in source) {
            if (Kvali.isObjectPlain(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {[key]: {},});
                }
                objectMerge(target[key], source[key]);
            } else {
                // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
                Object.assign(target, {[key]: source[key],});
            }
        }
    }

    return target;
}

/**
 * 获取对象大小,字节
 * @param v
 * @returns {number}
 */
export function objectSize(v) {
    if (!Kvali.isObject(v)) {
        v = Kconv.toObject(v)
    }

    let j = JSON.stringify(v)
    return Kstr.utf8Length(j)
}

export default {
    objectMerge,
    objectSize,
}
