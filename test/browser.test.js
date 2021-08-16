/**
 * @jest-environment jsdom
 */

import Kcons from "../lib/constant"
import Kbrow from "../lib/browser";
import Kvali from "../lib/validate"
import Kdata from "../test/data"

var assert = require('assert');

describe('Browser', function () {
    describe('#getSiteUrl', function () {
        let res = Kbrow.getSiteUrl(Kdata.url01)
        it('getSiteUrl should return not empty', function () {
            assert.equal(res !== '', true)
        });
    });
    describe('#getDomain', function () {
        let res1 = Kbrow.getDomain(Kdata.url01)
        let res2 = Kbrow.getDomain(Kdata.url01, true)
        let chk = res1.indexOf(res2) > 1
        it('getDomain should return not empty', function () {
            assert.equal(chk, true)
        });
    });
    describe('#getQueryByName', function () {
        let res1 = Kbrow.getQueryByName('q', Kdata.url02, false)
        it('getQueryByName(x,y,false) should return from query', function () {
            assert.equal(res1 !== null, true)
        });

        let res2 = Kbrow.getQueryByName('q', Kdata.url01, true)
        it('getQueryByName(x,y,true) should return from hash when query empty', function () {
            assert.equal(res2 !== null, true)
        });

        let res3 = Kbrow.getQueryByName(null, Kdata.url03, true)
        it('getQueryByName(null,y,true) should return object', function () {
            assert.equal(!Kvali.isEmpty(res3), true)
        });
    });

});