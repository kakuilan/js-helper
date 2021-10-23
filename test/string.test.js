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
})