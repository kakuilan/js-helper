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
        res = Kencr.md5(Kdata.strChinese)
        it('md5 supports UTF-8 encoding', function () {
            assert.equal(res, 'a7bac2239fcdcb3a067903d8077c4a07')
        });
    });

    describe('#base64Url', function () {
        let enc = Kencr.base64UrlEncode(Kdata.strHello)
        let dec = Kencr.base64UrlDecode(enc)

        let e2 = Kencr.base64UrlEncode(Kdata.url04)
        let d2 = Kencr.base64UrlDecode(e2)

        let e3 = Kencr.base64UrlEncode(Kdata.strTest)
        let d3 = Kencr.base64UrlDecode(e3)

        it('base64UrlDecode should return base64UrlEncode`s input', function () {
            assert.equal(dec, Kdata.strHello);

            assert.equal(e2, 'aHR0cHM6Ly90b29sLmdvb2dsZS5jb20ubmV0L2VuY3J5cHQ_dHlwZT00SGVsbG8gV29ybGQhIOS9oOWlve-8gQ')
            assert.equal(d2, Kdata.url04)

            assert.equal(e3, 'SGVsbG8gV29ybGQhIOS9oOWlve-8jOS4lueVjO-8gU9sw6Hwn5CNIFdpdGggRW1vamlzIPCfkLPwn5Oc')
            assert.equal(d3, Kdata.strTest)
        });
    });

    describe('#authcode', function () {
        let [e1, t1] = Kencr.authcode(Kdata.strHello, Kcons.VERSION, true, Kcons.TTL_ONE_DAY)
        let [d1, t2] = Kencr.authcode(e1, Kcons.VERSION, false)

        it('authcode encode/decode should be right', function () {
            assert.equal(d1, Kdata.strHello)
            assert.equal(t1, t2)
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
