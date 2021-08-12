import Kencr from "../lib/encrypt"
import Kdata from "../test/data"
// let Kencr = require("../lib/encrypt")
// let Kdata = require("../test/data")


var assert = require('assert');
describe('Encrypt', function () {
    describe('#base64Url', function () {
        let enc = Kencr.base64UrlEncode(Kdata.strHello)
        console.log("-------------00:", enc)
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
