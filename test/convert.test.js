import Kconv from "../lib/convert"
import Kdata from "../test/data"

var assert = require('assert');

describe('Convert', function () {
    describe('#ipToInt', function () {
        let res = Kconv.ipToInt(Kdata.ip01)
        it('ipToInt return int', function () {
            assert.equal(res, Kdata.int01)
        });
    });

    describe('#intToIP', function () {
        let res = Kconv.intToIP(Kdata.int01)
        it('intToIP return string', function () {
            assert.equal(res, Kdata.ip01)
        });
    });
});