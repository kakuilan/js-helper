/**
 * 获取当前时间戳，秒
 * @returns {number}
 */
export function nowSecond(): number {
  return Math.round(new Date().getTime() / 1000);
}

/**
 * 获取当前时间戳，毫秒
 * @returns {number}
 */
export function nowMilli(): number {
  return new Date().getTime();
}

/**
 * 将时间戳转为日期字符串
 * @param {string} format 格式
 * @param {number} timestamp 时间戳,秒
 * @returns {string}
 */
export function time2Date(
  format: string,
  timestamp: number | undefined,
): string {
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  // pads the number a until it is b digits long
  function zp(a: number, b: number): string {
    return (1e9 + a + '').slice(-b);
  }

  // returns ordinal suffix for number a
  function or(a: number): string {
    return ['th', 'st', 'nd', 'rd'][
      ((a = ~~(a < 0 ? -a : a) % 100) > 10 && a < 14) || (a %= 10) > 3 ? 0 : a
    ];
  }

  // returns timestamp of first monday in year y
  function fm(y: number): number {
    const d = new Date(y, 0, 1);
    while (d.getDay() - 1) d.setDate(d.getDate() + 1);
    return +d;
  }

  // Timestamp of midnight
  function mn(d: number): number {
    return 864e5 * ~~(d / 864e5);
  }

  /**
   * 补前导零(0)
   * @param {string} str 字符
   * @param {number} len 长度
   * @param {string} placeholder 前导占位符
   * @returns {string}
   */
  function pad(str: string, len: number, placeholder = '0'): string {
    str += '';
    if (str.length < len) {
      return new Array(++len - str.length).join(placeholder) + str;
    } else {
      return str;
    }
  }

  let dt: Date;
  if (timestamp !== undefined && timestamp > 0) {
    dt = new Date(timestamp * 1000);
  } else {
    dt = new Date();
  }

  let fmt = format;
  if (fmt === 'smart') {
    //智能地显示
    const curDate = new Date();
    const difTime = curDate.getTime() - dt.getTime(),
      difHour = difTime / 3600000,
      difMinu = curDate.getMinutes() - dt.getMinutes();
    if (difHour <= 1) {
      return difMinu > 5 ? difMinu + '分钟前' : '刚刚';
    } else if (difHour < 24) {
      return difHour + '小时前';
    } else if (difHour < 24 * 10) {
      return difHour / 24 + '天前';
    } else {
      fmt = 'Y-n-j H:i';
    }
  }

  const year = dt.getFullYear(),
    month = dt.getMonth(),
    date = dt.getDate(),
    day = dt.getDay(),
    hour = dt.getHours(),
    mins = dt.getMinutes(),
    secs = dt.getSeconds(),
    ms = dt.getMilliseconds(),
    tz = dt.getTimezoneOffset();

  function component(code: string): number | string {
    let ret: number | string = code;
    // in the order they appear on http://php.net/manual/en/function.date.php
    // Not as nice-looking as a switch, I know. But it compiles smaller
    if (code === 'd') ret = zp(date, 2);
    if (code === 'D') ret = dayNames[day].substring(0, 3);
    if (code === 'j') ret = date;
    if (code === 'l') ret = dayNames[day];
    if (code === 'N') ret = day || 7;
    if (code === 'S') ret = or(date);
    if (code === 'w') ret = day;
    if (code === 'z')
      ret = 0 | ((dt.getTime() - new Date(year, 0, 1).getTime()) / 864e5);
    if (code === 'W')
      ret = Math.ceil(~~((mn(dt.getTime()) - fm(year)) / 864e5 + 0.5) / 7);
    if (code === 'F') ret = monthNames[month];
    if (code === 'm') ret = zp(month + 1, 2);
    if (code === 'M') ret = monthNames[month].substring(0, 3);
    if (code === 'n') ret = month + 1;
    if (code === 't') ret = new Date(year, month + 1, 0).getDate();
    if (code === 'L') ret = +(new Date(year, 2, 0).getDate() === 29);
    if (code === 'o') ret = year - +(new Date(fm(year)) > dt);
    if (code === 'Y') ret = year;
    if (code === 'y') ret = (year + '').slice(-2);
    if (code === 'a') ret = hour > 11 ? 'pm' : 'am';
    if (code === 'A') ret = hour > 11 ? 'PM' : 'AM';
    if (code === 'B') ret = 0 | (((+dt + 36e5) % 864e5) / 86400);
    if (code === 'g') ret = hour % 12 || 12;
    if (code === 'G') ret = hour;
    if (code === 'h') ret = zp(hour % 12 || 12, 2);
    if (code === 'H') ret = zp(hour, 2);
    if (code === 'i') ret = zp(mins, 2);
    if (code === 's') ret = zp(secs, 2);
    if (code === 'u') ret = ms * 1000;
    //if(code==='e')ret = undefined; // Can this be done in js?
    if (code === 'I')
      ret = +!!(
        (new Date(year, month, day).getTime() -
          new Date(year, 1, 1).getTime()) %
        864e5
      );

    //if (code === 'O') ret = /(\S*\s){5}\S+([+\-]\d{4})/.exec(dt.toString())[2];
    if (code === 'O') {
      ret =
        (dt.getTimezoneOffset() > 0 ? '-' : '+') +
        pad(Math.abs((dt.getTimezoneOffset() / 60) * 100).toString(), 4);
    }

    //if (code === 'P') ret = /(\S*\s){5}\S+([+\-]\d{2})(\d{2})/.exec(dt.toString()).slice(2).join(':');
    if (code === 'P') {
      const o =
        (dt.getTimezoneOffset() > 0 ? '-' : '+') +
        pad(Math.abs((dt.getTimezoneOffset() / 60) * 100).toString(), 4);
      const r = o.match(/[+-]?\d{2}/g);
      if (!!r && r.length > 0) {
        ret = r.join(':');
      }
    }

    //if(code==='T')ret = undefined; // Can this be done in js?
    if (code === 'Z') ret = -tz * 60;
    if (code === 'U') ret = 0 | (dt.getTime() / 1000);

    return ret;
  }

  let out = '';
  const cache: { [key: string]: string | number } = {};
  while (fmt) {
    const c = fmt.charAt(0);
    if (c === '\\') {
      out += fmt.charAt(1);
      fmt = fmt.slice(2);
      continue;
    }

    let bit;
    if (c in cache) {
      bit = cache[c];
    } else {
      bit = component(c).toString();
      cache[c] = bit;
    }

    out += bit !== undefined ? bit : c;
    fmt = fmt.slice(1);
  }
  return out;
}

export default {
  nowSecond,
  nowMilli,
  time2Date,
};
