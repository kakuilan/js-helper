import Kconv from "../convert"
import Kvali from "../validate"
import MD5 from 'crypto-js/md5'

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
