import Kcons from "../lib/constant"
import Kencr from "../lib/encrypt"
import Kdata from "../test/data"

var assert = require('assert');

describe('Encrypt', function () {
    describe('#md5', function () {
        let r1 = Kencr.md5(Kdata.strHello)
        it('md5 return 32 bit', function () {
            assert.equal(r1.length, 32)
        });

        let r2 = Kencr.md5('')
        it('md5 empty should be work', function () {
            assert.equal(r2, Kdata.strEmptyMd5)
        });

        let r3 = Kencr.md5(Kdata.strChinese)
        it('md5 supports UTF-8 encoding', function () {
            assert.equal(r3, 'a7bac2239fcdcb3a067903d8077c4a07')
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
        const key = Kdata.strEmptyMd5;
        let [r1, t1] = Kencr.authcode(Kdata.strHello, key, true, Kcons.TTL_ONE_DAY)
        let [d1, e1] = Kencr.authcode(r1, key, false)

        it('authcode encode/decode should be right', function () {
            assert.equal(d1, Kdata.strHello)
            assert.equal(t1, e1)
        });

        //其他
        const str1 = "8c9eb7905a6SdXZfm-GoJpYKu6CzMgF0I-7neF-x3UKIUpYuIZSnK_2ZqaYSZlZw0Ofzwa2Bn0QZ6b4SLzSz";
        const str2 = "b42374af3DqX22zi207OJXsz6xP2vEXto39TPK_UzcJOdDZV0kQHPUFm5JOw-aWISFi0snglsrYtp5tpYGRuhgw50TPY8UnFSf912uZI38vGON0KHqAgCatmtdoBZ4VJI6IkHio-JLxbt8hkuCz1HCOElUkZxBMnGUle";
        const str3 = "52a0945eK4NyxvnjEBnPlToROzO4KLKE9VvrqtxAiLPVPDK-HkvzahyMbxydmSifc3TQIo4mbsi9gzq7vbJ64YzpB_DP";

        let [d2, e2] = Kencr.authcode(str1, key, false)
        it('authcode decode should be right1', function () {
            assert.equal(d2, Kdata.strHello)
        });
        let [d3, e3] = Kencr.authcode(str2, key, false)
        it('authcode decode should be right2', function () {
            assert.equal(d3, Kdata.strHelloEmoji)
        });
        let [d4, e4] = Kencr.authcode(str3, key.substring(0, 16), false)
        it('authcode decode should be right3', function () {
            assert.equal(d4, Kdata.strJson)
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
