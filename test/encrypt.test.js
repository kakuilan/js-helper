import Kcons from "../lib/constant"
import Kencr from "../lib/encrypt"
import Kdata from "../test/data"

var assert = require('assert');

describe('Encrypt', function () {
    describe('#md5', function () {
        let res = Kencr.md5(Kdata.strHello)
        it('md5 return 32 bit', function () {
            assert.equal(res.length, 32)
        });
    });

    describe('#base64Url', function () {
        let enc = Kencr.base64UrlEncode(Kdata.strHello)
        let dec = Kencr.base64UrlDecode(enc)
        it('base64UrlDecode should return base64UrlEncode`s input', function () {
            assert.equal(dec, Kdata.strHello);
        });
    });

    describe('#authcode', function () {
        let [enc,exp] = Kencr.authcode(Kdata.strHello, Kcons.VERSION, true, Kcons.TTL_ONE_DAY)
        let [dec,exp2] = Kencr.authcode(enc, Kcons.VERSION, false)
        it('authcode encode/decode should be right', function () {
            assert.equal(dec, Kdata.strHello)
            assert.equal(exp, exp2)
        });
    });
});
