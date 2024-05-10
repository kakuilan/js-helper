import number from '../lib/number';

describe('number Unit testing', () => {
  it('splitNaturalNum should working', () => {
    const res0 = number.splitNaturalNum(8, 2); //[ 8 ]
    const res1 = number.splitNaturalNum(9, 2); //[ 8, 1 ]
    const res2 = number.splitNaturalNum(99, 2); //[ 64, 32, 2, 1 ]

    expect(res0.length).toBe(1);
    expect(res1.length).toBe(2);
    expect(res2.length).toBe(4);
  });
});
