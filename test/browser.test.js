/**
 * @jest-environment jsdom
 */

import Kcons from "../lib/constant"
import Kbrow from "../lib/browser";
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

});