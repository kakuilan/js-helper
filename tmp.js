/**
 * 比较两个版本号（version1、version2）
 * 如果version1 > version2，返回1,
 * 如果version1 < version2，返回-1,
 * 其他情况返回0 .
 * @param version1
 * @param version2
 * @returns {number}
 */
function compareVersion(version1, version2) {
    const newVersion1 = `${version1}`.split('.').length < 3 ? `${version1}`.concat('.0') : `${version1}`;
    const newVersion2 = `${version2}`.split('.').length < 3 ? `${version2}`.concat('.0') : `${version2}`;

    //计算版本号大小,转化大小
    function toNum(a) {
        const c = a.toString().split('.');
        const num_place = ["", "0", "00", "000", "0000"],
            r = num_place.reverse();
        for (let i = 0; i < c.length; i++) {
            const len = c[i].length;
            c[i] = r[len] + c[i];
        }
        return c.join('');
    }

    //检测版本号是否需要更新
    function checkPlugin(a, b) {
        const numA = toNum(a);
        const numB = toNum(b);
        return numA > numB ? 1 : numA < numB ? -1 : 0;
    }

    return checkPlugin(newVersion1, newVersion2);
}

/**
 *  Converts a string into Capitalize
 *
 * 'abc' => 'Abc'
 */

function capitalize(value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Converts a string to UPPERCASE
 *
 * 'abc' => 'ABC'
 */

function uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
}

/**
 * Converts a string to lowercase
 *
 * 'AbC' => 'abc'
 */

function lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
}


/**
 *  Truncate at the given || default length
 *
 * 'lorem ipsum dolor' => 'lorem ipsum dol...'
 */

function truncate(value, length) {
    length = length || 15;
    if (!value || typeof value !== 'string') return '';
    if (value.length <= length) return value;
    return value.substring(0, length) + '...';
}

/**
 * 字符串截取
 * @param {*} value
 * @param {*} length
 * @param {*} location
 */
function chop(value, length, location) {
    if (!length) return 'Warn: option length (number) is required. morph-chop(length, location)';
    if (!location) location = 'end';
    if (typeof value !== 'string') value = value.toString();
    if (location === 'end') return value.toString().slice(0, ~length + 1);
    if (location === 'start') return value.toString().substring(length);
}

/**
 * 字符串替换
 * @param {*} value
 * @param {*} replacee
 * @param {*} replacer
 */
function replace(value, replacee, replacer) {
    return value.replace(replacee, replacer);
}

function flip(str) {
    var corpusRegex = /(<|>|\[|\]|\(|\)|\{|\})/g;
    return str.replace(corpusRegex, function (match) {
        return corpus[match];
    }).split('').reverse().join('');
}

/**
 * 首字母改大写
 * @param {String} str 字符串
 */
function firstUpperCase(str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

function contains(val, search) {
    var i;
    if (util.isPlainObject(val)) {
        var keys = Object.keys(val);
        i = keys.length;
        while (i--) {
            if (contains(val[keys[i]], search)) {
                return true;
            }
        }
    } else if (util.isArray(val)) {
        i = val.length;
        while (i--) {
            if (contains(val[i], search)) {
                return true;
            }
        }
    } else if (val != null) {
        return val.toString().toLowerCase().indexOf(search) > -1;
    }
}

/**
 * 获取文本长度
 * @param {Number} fontSize 字体大小
 * @param {String} text 文本
 */
function getTextWidth(fontSize, text) {
    var isFontWeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var span = document.createElement('span');
    var result = {};
    result.width = span.offsetWidth;
    result.height = span.offsetHeight;
    span.style.visibility = 'hidden';
    span.style.fontSize = fontSize;
    span.style.fontFamily = '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif';
    span.style.display = 'inline-block';
    span.style.fontWeight = isFontWeight ? 'bold' : 'normal';
    document.body.appendChild(span);
    span.innerText = text;
    result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
    result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
    document.body.removeChild(span);
    span = null;
    return result.width;
}

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 */
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * 生成随机id
 * @param {Number} length 生成长度
 */
function uniqueId(length) {
    var len = length || 9;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var id = '';
    for (var i = 0; i < len; i++) {
        id += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return id;
}

/**
 * 生成随机id 格式 29667b74-60b5-922a-6adc-e12b73b6e507
 */
function getGuid() {
    var id = '';
    var getRandom = function getRandom() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    for (var index = 0; index < 5; index++) {
        if (index == 0 || index == 4) {
            index == 0 ? id += '' + getRandom() + getRandom() + '-' : id += '' + getRandom() + getRandom();
        } else {
            id += getRandom() + '-';
        }
    }
    return id;
}

/**
 * 判断参数是否是其中之一
 * @param {any} value 要判断的参数值
 * @param {Array} validList 参数列表
 */
function oneOf(value, validList) {
    for (var i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

/**
 * 替换服务地址查询字符串
 * @param {String} url 服务地址
 * @param {Object} replaces 替换键值对
 */
function replaceQueryString(url, replaces) {
    var address = new URL(url);
    var params = address.searchParams;
    var keys = params.keys();
    var next = keys.next();
    var segments = [];
    while (!next.done) {
        var key = next.value;
        var lowerKey = key.toLowerCase();
        var value = params.get(next.value);
        if (replaces[lowerKey]) {
            value = replaces[lowerKey];
        }
        segments.push(key + '=' + value);
        next = keys.next();
    }
    var replaceAddress = '' + address.origin + address.pathname + '?' + segments.join('&');
    return replaceAddress;
}

/**
 * 对象转查询字符串
 * @param {Object} tar 要转换的对象
 */
function objectToQueryString(tar) {
    var segments = [];
    for (var key in tar) {
        segments.push(key + '=' + encodeURI(tar[key]));
    }
    return segments.join('&');
}

/**
 * 对象转查询字符串
 * @param {Object} tar 要转换的对象
 */
function objectToQueryString_ful(data) {
    var ret = '';
    for (var it in data) {
        var initRet = void 0;
        if (typeof data[it] !== 'string') {
            initRet = '';
            for (var j in data[it]) {
                initRet += encodeURIComponent(j) + '=' + encodeURIComponent(data[it][j]) + '&';
            }
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(initRet) + '&';
        } else {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
    }
    return ret;
}

/**
 * @description 效验特殊字符（针对于查询中条件的值）
 * @export
 * @param {any} value
 * @returns
 */
function stripscript(value) {
    var reg = /[`~!?@#$^&*= _|{}':;',\\\[<\]>\/！%￥……*——|""{}【】‘；：”“'。，、？\+\-《》]/gi;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description 效验特殊字符（针对于普遍的字符效验）
 * @export
 * @param {any} value
 * @returns
 */
function stripscript_all(value) {
    var reg = /[`~@#$^*()=|{};,\\\[\/！\]￥……*（）——|{}【】‘；：”“'。，、？\+\-《》]/gi;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description 地址解析方法
 * @export
 * @param {*} url 解析地址
 * @return {*}
 */
function parseUrlParam(url) {
    var params = {};
    var pIndex = url.indexOf('?');
    var reqParamUrl = url.substr(pIndex + 1, url.length);
    var reqParams = reqParamUrl.split('&');
    // 解析请求参数
    reqParams.forEach(function (reqParam, idx) {
        var eps = reqParam.split('=');
        if (eps && eps.length > 1) {
            var keps = eps[0];
            var veps = eps[1];
            params[keps] = veps;
        }
    });
    return params;
}

//校验是否输入特殊字符
function validateSpecChar(rule, value, callback) {
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9_]*$/.test(value)) {
        callback(new Error('不能输入特殊字符！'));
    } else {
        callback();
    }
}

/**
 * @description 计算两点空间距离
 * @param {*} start
 * @param {*} end
 * @return {*}
 */
function getDistance(start, end) {
    var point1cartographic = Cesium.Cartographic.fromCartesian(start);
    var point2cartographic = Cesium.Cartographic.fromCartesian(end);
    /**根据经纬度计算出距离**/
    var geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    var s = geodesic.surfaceDistance;
    //返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    return s.toFixed(2);
}

/**
 * 判断对象类型
 * @param {any} obj 对象
 */
function typeOf(obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

/**
 * 对象深拷贝
 * @param {any} data 要拷贝的对象
 */
function deepCopy(data) {
    var t = typeOf(data);
    var o = void 0;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (var i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (var _i in data) {
            o[_i] = deepCopy(data[_i]);
        }
    }
    return o;
}

function objectIsNull(obj) {
    if (typeOf(obj) === 'object') {
        var length = Object.keys(obj).length;
        if (length > 0) {
            return false;
        } else {
            return true;
        }
    }
}

/**
 * 对象对象值转数组
 * @param {Object} obj 对象
 * @param {String} prop 属性名
 */
function property2Array(obj, prop) {
    if (!obj || !obj[prop]) return;

    var value = obj[prop];
    if (!Array.isArray(value)) {
        obj[prop] = [value];
    }
}

/**
 * 值转数组
 * @param {any} value 值
 */
function value2Array(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

//默认的 KEY 与 iv
var KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
var IV = CryptoJS.enc.Utf8.parse('1234567890123456');

/**
 * AES加密
 * @param {String} word 加密的字符串
 * @param {String} keyStr Key
 * @param {String} ivStr iv
 */
function encryptAes(word, keyStr, ivStr) {
    var key = KEY;
    var iv = IV;

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES解密
 * @param {String} word 解密的字符串
 * @param {String} keyStr Key
 * @param {String} ivStr iv
 */
function decryptAes(word, keyStr, ivStr) {
    var key = KEY;
    var iv = IV;

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    var base64 = CryptoJS.enc.Base64.parse(word);
    var src = CryptoJS.enc.Base64.stringify(base64);

    var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });

    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

function createCommonjsModule(fn, module) {
    return module = {exports: {}}, fn(module, module.exports), module.exports;
}

/**
 * 生成随机字符串
 * @param len 字符串长度
 */
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function repeat(string, count) {
    var result = '', cycle;

    for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
    }

    return result;
}

/**
 * 遍历对象
 * @param obj
 * @param run
 * @returns {*}
 */
function loopObject(obj, run = (ob, key, value) => value) {
    const loop = record => {
        if (!record) return;
        if (typeof record !== 'object') return;
        // @ts-ignore
        if (Array.isArray(record)) return record.forEach(item => loop(item, run));

        Object.entries(record)
            .forEach(([key, value]) => {
                if (typeof value === 'object') return loop(value);

                run(record, key, value);
            });
    };

    loop(obj);

    return obj;
}


/**
 * 获取地址栏参数，转为对象
 * @param str
 * @returns {{}}
 */
function getQuery(str = '') {
    const query = {};

    const search = str || window.location.href.split('?')[1];
    const urlSearchParams = new URLSearchParams(search);

    // eslint-disable-next-line no-restricted-syntax
    for (let key of urlSearchParams.keys()) {
        query[key] = urlSearchParams.get(key);
    }

    return query;
}

/**
 * 对象转 query string
 * @param obj
 * @returns {string}
 */
function toQuery(obj) {
    return qs.stringify(obj, {encode: false});
}

/**
 * 获取一个元素距离浏览器顶部高度
 * @param element
 * @returns {number | Requireable<number>}
 */
function getElementTop(element) {
    if (!element) return 0;
    let actualTop = element.offsetTop;
    let current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

/**
 * 获取浏览器滚动条宽度
 * @returns {number}
 */
function getScrollBarWidth() {
    let scrollDiv = document.createElement('div');
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    let scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    window.document.body.removeChild(scrollDiv);
    return scrollBarWidth;
}

/**
 * 判断是否有滚动条
 * @param element
 * @param direction
 * @returns {boolean}
 */
function hasScrollBar(element, direction = 'vertical') {
    if (direction === 'vertical') {
        return element.scrollHeight > element.clientHeight;
    }
    if (direction === 'horizontal') {
        return element.scrollWidth > element.clientWidth;
    }
}

/**
 * 遍历对象
 *
 * @param target 遍历对象
 * @param processor 处理器
 * @author minifive
 * @example
 * let obj = {a: 1}
 * eachObject(obj, (key, value) => {
 *      console.log(key, value) // a, 1
 * })
 */
function eachObject(target, processor) {
    const keys = Object.keys(target);
    keys.forEach(key => {
        processor(key, target[key]);
    });
}

/**
 * 复制文本到粘贴板
 * @param text 复制的文本
 */
function copyTextClipboard(text) {
    let selection = null;
    const span = document.createElement('span');
    span.innerHTML = text;
    document.body.appendChild(span);
    const range = document.createRange();
    range.selectNode(span);
    selection = window.getSelection();
    if (selection) {
        selection.addRange(range);
    } else {
        return false;
    }
    let isSuccess = false;
    try {
        isSuccess = document.execCommand('copy');
    } catch (err) {
        isSuccess = false;
    }
    selection = window.getSelection();
    selection && selection.removeAllRanges();
    document.body.removeChild(span);
    return isSuccess;
}

/**
 *  获取 url 参数
 * @param name 参数名称
 */
function getUrlParam(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const match = window.location.search.substr(1).match(reg);
    if (match != null) {
        return decodeURIComponent(match[2]);
    }
    return null;
}

/**
 * 获取所有 url 参数
 */
function getAllUrlParams() {
    const search = window.location.search.substr(1);
    const pair = {};
    if (search) {
        search.split('&').map(v => {
            const temp = v.split('=');
            pair[temp[0]] = decodeURIComponent(temp[1]);
        });
    }
    return pair;
}

/**
 * 全屏 api
 */
/**
 * 进入全屏
 * @param el 要全屏的 element
 */
async function fullscreen(el) {
    try {
        el = el || document.documentElement;
        if (el.requestFullscreen) {
            await el.requestFullscreen();
            // @ts-ignore
        } else if (el.webkitRequestFullscreen) {
            // @ts-ignore
            await el.webkitRequestFullscreen();
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

/**
 * 退出全屏
 */
function exitFullscreen() {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            // @ts-ignore
        } else if (document.webkitExitFullscreen) {
            // @ts-ignore
            document.webkitExitFullscreen();
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// 判断是否全屏
function isFullScreen() {
    return (document.fullscreenElement ||
        // @ts-ignore
        document.webkitCurrentFullScreenElement ||
        // @ts-ignore
        document.mozFullScreenElement ||
        null);
}

/**
 * 加载样式
 * @param src 样式地址
 * @param timeout 超时时间
 */
function loadCss(src, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        let _isReturn = false;
        const loadTimeout = setTimeout(() => {
            if (_isReturn) {
                return;
            }
            _isReturn = true;
            resolve(false);
        }, timeout);
        link.onload = () => {
            if (_isReturn) {
                return;
            }
            clearTimeout(loadTimeout);
            _isReturn = true;
            resolve(true);
        };
        link.onerror = () => {
            if (_isReturn) {
                return;
            }
            clearTimeout(loadTimeout);
            _isReturn = true;
            resolve(false);
        };
        link.setAttribute('rel', 'stylesheet');
        link.href = src;
        if (document.head) {
            document.head.appendChild(link);
        }
    });
}

/**
 * 异步加载 script
 * @param src
 * @param timeout 超时时间
 */
function loadScript(src, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        let _isReturn = false;
        const loadTimeout = setTimeout(() => {
            if (_isReturn) {
                return;
            }
            _isReturn = true;
            resolve(false);
        }, timeout);
        script.onload = () => {
            if (_isReturn) {
                return;
            }
            clearTimeout(loadTimeout);
            _isReturn = true;
            resolve(true);
        };
        script.onerror = () => {
            if (_isReturn) {
                return;
            }
            clearTimeout(loadTimeout);
            _isReturn = true;
            resolve(false);
        };
        script.setAttribute('defer', 'defer');
        script.setAttribute('async', 'async');
        script.src = src;
        document.head.appendChild(script);
    });
}

const _loadScriptQueue = {};

/**
 * 通过队列加载
 * @param src js 路径名称
 * @param timeout 超时时间
 */
async function queueLoadScript(src, timeout = 10000) {
    if (_loadScriptQueue[src] === true) {
        return true;
    }
    if (Array.isArray(_loadScriptQueue[src])) {
        return new Promise(resolve => {
            _loadScriptQueue[src].push({
                resolve
            });
        });
    }
    _loadScriptQueue[src] = [];
    const res = await loadScript(src, timeout);
    _loadScriptQueue[src].forEach((promise) => promise.resolve(res));
    if (res === true) {
        _loadScriptQueue[src] = true;
    }
    return res;
}

function getQuery00(name, url = window.location.search) {
    if (typeof name !== 'string' || typeof url !== 'string') return ''
    let obj = getQueryObj(url)
    cacheQueryObj = obj
    if (name === '') return obj
    let value = obj[name]
    return value === undefined ? '' : value
}

function isIdcard(code) {
    if (typeof code !== 'string') return false
    if (code.length < 15) return false
    let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 ',
    }

    if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
            code
        )
    ) {
        return false
    }
    if (!city[code.substr(0, 2)]) {
        return false
    }
    if (code.length == 18) {
        code = code.split('')
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
        }
        if (parity[sum % 11] != code[17]) {
            return false
        }
    }
    return true
}


/**
 * 延迟执行
 * 使用方法:
 * sleep(500).then(() => {
 *   //do stuff
 * })
 * 或者
 * const doSomething = async () => {
 *   await sleep(2000)
 *   //do stuff
 * }
 * doSomething()
 *
 * @param t 毫秒
 * @returns {Promise<unknown>}
 */
function sleep(t) {
    return new Promise((resolve, reject) => {
        if (typeof t !== "number") {
            reject();
        } else {
            setTimeout(() => {
                resolve();
            }, t);
        }
    });
}

String.fromCharCode(64)
String.charCodeAt(0)
var sChar = String.fromCharCode(34);
var nCharCode = "\"".charCodeAt(0);

function chr(ascii) {
    // Converts a codepoint number to a character
    //
    // version: 810.114
    // discuss at: http://phpjs.org/functions/chr
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: chr(75);
    // *     returns 1: 'K'
    return String.fromCharCode(ascii);
}

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function validURL00(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function is_url(str) {
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}

function getQueryByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
