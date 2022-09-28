import Kcons from "../lib/constant"
import Kencr from "../lib/encrypt"
import Kstr from "../lib/string"
import Kvali from "../lib/validate"
import Kdata from "../test/data"

var assert = require('assert');

describe('Validate', function () {
    describe('#isUrl', function () {
        let res1 = Kvali.isUrl(Kdata.strHello);
        let res2 = Kvali.isUrl(Kdata.int01);
        let res3 = Kvali.isUrl(Kdata.url01);
        let res4 = Kvali.isUrl(Kdata.url02);
        let res5 = Kvali.isUrl(Kdata.url03);
        let res6 = Kvali.isUrl(Kdata.url04);
        let res7 = Kvali.isUrl(Kdata.url05);
        let res8 = Kvali.isUrl(Kdata.url06);
        let res9 = Kvali.isUrl(Kdata.file01);
        let res10 = Kvali.isUrl(Kdata.ip01);
        let res11 = Kvali.isUrl(Kdata.url07);
        let res12 = Kvali.isUrl(Kdata.url08);

        it('isUrl check string is url.', function () {
            assert.equal(res1, false);
            assert.equal(res2, false);
            assert.equal(res3, true);
            assert.equal(res4, true);
            assert.equal(res5, false);
            assert.equal(res6, true);
            assert.equal(res7, false);
            assert.equal(res8, false);
            assert.equal(res9, false);
            assert.equal(res10, false);
            assert.equal(res11, true);
            assert.equal(res12, true);
        });
    });
})