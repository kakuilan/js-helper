import Kconv from "../convert"
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
    let r = Base64.stringify(Utf8.parse(v))
    r = r.replace('+', '-').replace('/', '_')
    return _.trimEnd(r, '=')
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
    v = v.replace('-', '+').replace('_', '/')
    v = _.padEnd(v, v.length % 4, '=')
    let r = Base64.parse(v)
    return r.toString()
}

export default {
    md5,
    base64UrlEncode,
    base64UrlDecode,
}
