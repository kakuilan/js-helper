/**
 * 获取当前时间戳，秒
 * @returns {number}
 */
function nowSecond() {
    return Math.round(new Date().getTime() / 1000);
}

/**
 * 获取当前时间戳，毫秒
 * @returns {number}
 */
function nowMilli() {
    return new Date().getTime();
}
