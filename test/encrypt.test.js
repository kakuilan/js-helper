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
});
