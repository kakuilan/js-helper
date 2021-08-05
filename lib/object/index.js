import Validate from "../validate"

/**
 * 对象合并
 * @param target 目标对象
 * @param source 源对象
 * @returns {*}
 */
function objMerge(target, source) {
    if (Validate.isObject(target) && Validate.isObject(source)) {
        let key;
        for (key in source) {
            if (Validate.isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {[key]: {},});
                }
                objMerge(target[key], source[key]);
            } else {
                // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
                Object.assign(target, {[key]: source[key],});
            }
        }
    }

    return target;
}
