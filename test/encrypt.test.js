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

        let e2 = Kencr.base64UrlEncode(Kdata.url04)
        let d2 = Kencr.base64UrlDecode(e2)

        it('base64UrlDecode should return base64UrlEncode`s input', function () {
            assert.equal(dec, Kdata.strHello);

            assert.equal(e2, 'aHR0cHM6Ly90b29sLmdvb2dsZS5jb20ubmV0L2VuY3J5cHQ_dHlwZT00SGVsbG8gV29ybGQhIOS9oOWlve-8gQ')
            assert.equal(d2, Kdata.url04)
        });
    });

    describe('#authcode', function () {
        let [enc, exp] = Kencr.authcode(Kdata.strHello, Kcons.VERSION, true, Kcons.TTL_ONE_DAY)
        let [dec, exp2] = Kencr.authcode(enc, Kcons.VERSION, false)
        it('authcode encode/decode should be right', function () {
            assert.equal(dec, Kdata.strHello)
            assert.equal(exp, exp2)
        });
    });

    describe('#easyEncryptDecrypt', function () {
        let enc = Kencr.easyEncrypt(Kdata.strHello, Kcons.VERSION)
        let dec = Kencr.easyDecrypt(enc, Kcons.VERSION)
        it('easyEncrypt should return easyDecrypt`s input', function () {
            assert.equal(dec, Kdata.strHello)
        });
    });

});
