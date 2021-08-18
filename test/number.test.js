import Kcons from "../lib/constant"
import Knumb from "../lib/number"
import Kvali from "../lib/validate"
import Kdata from "../test/data"

var assert = require('assert');

describe('Number', function () {
    describe('#splitNaturalNum', function () {
        let res0 = Knumb.splitNaturalNum(8, 2) //[ 8 ]
        let res1 = Knumb.splitNaturalNum(9, 2) //[ 8, 1 ]
        let res2 = Knumb.splitNaturalNum(99, 2) //[ 64, 32, 2, 1 ]
        it('splitNaturalNum should return not empty array', function () {
            assert.equal(res0.length, 1)
            assert.equal(res1.length, 2)
            assert.equal(res2.length, 4)
        });
    });

});
