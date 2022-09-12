import Kcons from "../lib/constant"
import Kencr from "../lib/encrypt"
import Kstr from "../lib/string"
import Kdata from "../test/data"

var assert = require('assert');

describe('String', function () {
    describe('#toBytes', function () {
        let arr = Kstr.str2Bytes(Kdata.strTest)
        let str = Kstr.bytes2Str(arr)

        it('str2Bytes return a UTF-8 “byte” array.', function () {
            assert.equal(arr.length, 60)
            assert.equal(Kdata.strTest, str)
        });
    });

    describe('#getFileExt', function () {
        let res1 = Kstr.getFileExt('50.xsl')
        let res2 = Kstr.getFileExt('a.B')
        let res3 = Kstr.getFileExt('.gitignore')
        let res4 = Kstr.getFileExt('error')
        let res5 = Kstr.getFileExt('')
        let res6 = Kstr.getFileExt('a.b.c.d')
        let res7 = Kstr.getFileExt('.a.b')
        let res8 = Kstr.getFileExt('a..b')
        let res9 = Kstr.getFileExt('http://example.net/site/page.php?id=16548')
        let res10 = Kstr.getFileExt('http://example.net/site/page.html#welcome.to.me')

        it('getFileExt return file extension.', function () {
            assert.equal(res1, 'xsl')
            assert.equal(res2, 'b')
            assert.equal(res3, '')
            assert.equal(res4, '')
            assert.equal(res5, '')
            assert.equal(res6, 'd')
            assert.equal(res7, 'b')
            assert.equal(res8, 'b')
            assert.equal(res9, 'php')
            assert.equal(res10, 'html')
        });
    });
})