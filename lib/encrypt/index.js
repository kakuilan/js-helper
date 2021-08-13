import Kcons from "../constant"
import Kconv from "../convert"
import Kstr from "../string"
import Ktime from "../datetime"
import Kvali from "../validate"
import MD5 from 'crypto-js/md5'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

let _ = require('lodash')

/**
 * md5
 * @param v
 * @returns {string}
 */
function md5(v) {
    if (!Kvali.isString(v)) {
        v = Kconv.toString(v)
    }
    return MD5(v).toString()
}

/**
 * url安全的base64_encode
 * @param v
 * @returns {string}
 */
function base64UrlEncode(v) {
    let aaa = Utf8.parse("Hello World! 你好，世界！")
    let bbb = Utf8.parse(aaa)

    let r = Base64.stringify(Utf8.parse(v))
    r = r.replace(/\+/g, '-').replace(/\//g, '_')
    r = _.trimEnd(r, '=')
    return r
}

/**
 * url安全的base64_decode
 * @param v
 * @returns {string}
 */
function base64UrlDecode(v) {
    if (!Kvali.isString(v)) {
        return ''
    }
    v = v.replace(/-/g, '+').replace(/_/g, '/')
    v = _.padEnd(v, v.length % 4, '=')
    let r = Base64.parse(v)
    return r.toString(Utf8)
}

function authcode(data, key, encode = true, expiry = 0) {
    if (!Kvali.isString(data) || data === '') {
        return ['', 0]
    } else if (!encode && data.length < Kcons.DYNAMIC_KEY_LEN) {
        return ['', 0]
    }

    if (!Kvali.isInteger(expiry)) {
        expiry = 0
    } else {
        expiry = parseInt(expiry)
    }

    key = md5(key)
    let now = Ktime.nowSecond()
    let keya = key.substr(0, 16)
    let keyb = key.substr(16, 16)
    let keyc = encode ? (md5(Ktime.nowMilli()).substr(-Kcons.DYNAMIC_KEY_LEN)) : (data.substr(0, Kcons.DYNAMIC_KEY_LEN))
    let keyd = md5(keya + keyc)
    let cryptkey = keya + keyd
    let keyLen = cryptkey.length

    if (encode) {
        if (expiry !== 0) {
            expiry += now
        }
        let expMd5 = md5(data + keyb).substr(0, 16)
        data = Kstr.sprintf('%010d', expiry) + expMd5 + data
    } else {
        data = base64UrlDecode(data.substr(Kcons.DYNAMIC_KEY_LEN))
    }

    let dataLen = data.length
    let box = new Array(256)
    let rndkey = []
    for (let i = 0; i < 256; i++) {
        box[i] = i;
    }
    for (let i = 0; i < 256; i++) {
        rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length);
    }
    let i, j, tmp;
    for (j = i = 0; i < 256; i++) {
        tmp = box[i];
        j = (j + box[i] + rndkey[i]) % 256;
        box[i] = box[j];
        box[j] = tmp;
    }

    let res = ''
    let a
    for (a = j = i = 0; i < dataLen; i++) {
        a = (a + 1) % 256;
        j = (j + box[a]) % 256;
        tmp = box[a];
        box[a] = box[j];
        box[j] = tmp;
        //res += chr(ord(data[i]) ^ (box[(box[a] + box[j]) % 256]))
        res += ''
    }


}


export default {
    md5,
    base64UrlEncode,
    base64UrlDecode,
}
