import Kvali from "../validate"

let _ = require('lodash')
let parse = require('url-parse')
let qs = require('qs')

/**
 * 将文件转为base64
 * @param {File} f 文件对象
 * @returns {Promise<string | ArrayBuffer>}
 */
function fileToBase64(f) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let res;
        reader.readAsDataURL(f);
        reader.onload = function () {
            res = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(res);
        };
    });
}

/**
 * 将图片转为base64,并压缩
 * @param {File} file 图片文件对象
 * @param {number} [resize=1] 缩放比例0-1
 * @param {number} [encoderOptions=0.8] canvas转图片时，图片质量比例0-1
 * @return {*}  {Promise<string>} 返回图片base64字符串
 */
function imgToBase64(file, resize = 1, encoderOptions = 0.8) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        var reader = new FileReader();
        reader.onload = function () {
            img.src = reader.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");
                context.scale(resize, resize);
                canvas.width = img.width * resize;
                canvas.height = img.height * resize;
                //缩小画布，毕竟手机拍下来的图片都是几千像素乘几千像素的大小
                context.drawImage(img, 0, 0, img.width * resize, img.height * resize);
                //canvas生成后通过toDataURL获取canvas 处理后的其base64码，并自定义其画质，此处是0.5
                const imgBase64 = canvas.toDataURL(file.type, encoderOptions);
                resolve(imgBase64);
            };
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * 从URL中获取站点网址
 * @param url
 * @returns {string}
 */
function getSiteUrl(url) {
    if (Kvali.isEmpty(url)) {
        url = window.location.href
    } else if (url.indexOf('//') === 0) {
        url = 'http:' + url
    }

    if (!Kvali.isUrl(url)) {
        return ''
    }

    let obj = parse(url, true)

    return obj.origin
}

/**
 * 从URL中获取域名
 * @param url
 * @param firstLevel 是否获取一级域名,如:abc.test.com取test.com
 * @returns {Url.hostname|string}
 */
function getDomain(url, firstLevel = false) {
    if (Kvali.isEmpty(url)) {
        url = window.location.href
    } else if (url.indexOf('//') === 0) {
        url = 'http:' + url
    }

    if (!Kvali.isUrl(url)) {
        return ''
    }

    let obj = parse(url, true)
    let res = obj.host
    if (firstLevel) {
        let arr = _.split(obj.host, '.')
        if (arr.length >= 2) {
            let ret = _.slice(arr, arr.length - 2)
            res = ret.join('.')
        }
    }

    return res
}

/**
 * 从Query中获取参数
 * @param name 参数名,为空时将取整个参数对象
 * @param url URL地址
 * @param chkHash 当query参数为空时,是否检查哈希串(即为#号后面)
 * @returns {*}
 */
function getQueryByName(name, url, chkHash = true) {
    if (Kvali.isEmpty(url)) {
        url = window.location.href
    }

    let res = null, ret = null, str = null
    let obj = parse(url, true)

    if (!Kvali.isEmpty(obj.query)) {
        res = obj.query
    } else if (chkHash && !Kvali.isEmpty(obj.hash)) {
        str = obj.hash
        let idx = str.indexOf('?')
        if (idx !== -1) {
            str = str.substr(idx + 1)
        }
        res = qs.parse(str, {ignoreQueryPrefix: true})
    }

    if (name && Kvali.isObjectPlain(res)) {
        ret = res[name] ?? null
    } else {
        ret = res
    }

    return ret
}


export default {
    fileToBase64,
    imgToBase64,
    getSiteUrl,
    getDomain,
    getQueryByName,
}
