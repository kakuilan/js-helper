/**
 * 获取当前时间戳，秒
 * @returns {number}
 */
export function nowSecond() {
    return Math.round(new Date().getTime() / 1000);
}

/**
 * 获取当前时间戳，毫秒
 * @returns {number}
 */
export function nowMilli() {
    return new Date().getTime();
}

/**
 * 将时间戳转为日期字符串
 * @param format 格式
 * @param timestamp 时间戳
 * @returns {string}
 */
export function time2Date(format, timestamp) {
    const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

    function zp(a, b) {
        return (1e9 + a + '').slice(-b)
    } // pads the number a until it is b digits long
    function or(a) {
        return ["th", "st", "nd", "rd"][(a = ~~(a < 0 ? -a : a) % 100) > 10 && a < 14 || (a %= 10) > 3 ? 0 : a]
    } // returns ordinal suffix for number a
    function fm(y) {
        var d = new Date(y, 0, 1);
        while (d.getDay() - 1) d.setDate(d.getDate() + 1);
        return +d
    } // returns timestamp of first monday in year y
    function mn(d) {
        return 864e5 * ~~(d / 864e5)
    } // Timestamp of midnight

    let dt;
    if (timestamp !== "undefined" && timestamp > 0) {
        dt = new Date(timestamp * 1000);
    } else {
        dt = new Date();
    }

    if (format === "smart") { //智能地显示
        const curDate = new Date(),
            difTime = curDate - dt,
            difHour = difTime / 3600000,
            difMinu = curDate.getMinutes() - dt.getMinutes();
        if (difHour <= 1) {
            return (difMinu > 5) ? parseInt(difMinu) + "分钟前" : "刚刚";
        } else if (difHour < 24) {
            return parseInt(difHour) + "小时前";
        } else if (difHour < (24 * 10)) {
            return parseInt(difHour / 24) + "天前";
        } else {
            format = "Y-n-j H:i";
        }
    }

    let year = dt.getFullYear(),
        month = dt.getMonth(),
        date = dt.getDate(),
        day = dt.getDay(),
        hour = dt.getHours(),
        mins = dt.getMinutes(),
        secs = dt.getSeconds(),
        ms = dt.getMilliseconds(),
        tz = dt.getTimezoneOffset();

    function component(code) {
        var ret;
        // in the order they appear on http://php.net/manual/en/function.date.php
        // Not as nice-looking as a switch, I know. But it compiles smaller
        if (code === 'd') ret = zp(date, 2);
        if (code === 'D') ret = dayNames[day].substring(0, 3);
        if (code === 'j') ret = date;
        if (code === 'l') ret = dayNames[day];
        if (code === 'N') ret = day || 7;
        if (code === 'S') ret = or(date);
        if (code === 'w') ret = day;
        if (code === 'z') ret = 0 | (dt - new Date(year, 0, 1)) / 864e5;
        if (code === 'W') ret = Math.ceil(~~((mn(dt) - fm(year)) / 864e5 + 0.5) / 7);
        if (code === 'F') ret = monthNames[month];
        if (code === 'm') ret = zp(month + 1, 2);
        if (code === 'M') ret = monthNames[month].substring(0, 3);
        if (code === 'n') ret = month + 1;
        if (code === 't') ret = (new Date(year, month + 1, 0)).getDate();
        if (code === 'L') ret = +((new Date(year, 2, 0)).getDate() === 29);
        if (code === 'o') ret = year - +(new Date(fm(year)) > dt);
        if (code === 'Y') ret = year;
        if (code === 'y') ret = (year + '').slice(-2);
        if (code === 'a') ret = hour > 11 ? 'pm' : 'am';
        if (code === 'A') ret = hour > 11 ? 'PM' : 'AM';
        if (code === 'B') ret = 0 | ((+dt + 36e5) % 864e5) / 86400;
        if (code === 'g') ret = (hour % 12) || 12;
        if (code === 'G') ret = hour;
        if (code === 'h') ret = zp((hour % 12) || 12, 2);
        if (code === 'H') ret = zp(hour, 2);
        if (code === 'i') ret = zp(mins, 2);
        if (code === 's') ret = zp(secs, 2);
        if (code === 'u') ret = ms * 1000;
        //if(code==='e')ret = undefined; // Can this be done in js?
        if (code === 'I') ret = +!!((new Date(year, month, day) - new Date(year, 1, 1)) % 864e5);
        if (code === 'O') ret = /(\S*\s){5}\S+([+\-]\d{4})/.exec(dt.toString())[2];
        if (code === 'P') ret = /(\S*\s){5}\S+([+\-]\d{2})(\d{2})/.exec(dt.toString()).slice(2).join(':');
        //if(code==='T')ret = undefined; // Can this be done in js?
        if (code === 'Z') ret = -tz * 60;
        if (code === 'U') ret = 0 | dt / 1000;

        return ret;
    }

    let out = "", cache = {};
    while (format) {
        const c = format.charAt(0);
        if (c === "\\") {
            out += format.charAt(1);
            format = format.slice(2);
            continue;
        }
        const bit = (c in cache) ? cache[c] : (cache[c] = component(c));
        out += (bit !== undefined) ? bit : c;
        format = format.slice(1);
    }
    return out;
}

export default {
    nowSecond,
    nowMilli,
    time2Date,
}
