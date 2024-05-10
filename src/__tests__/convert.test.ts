import convert from '../lib/convert';
import validate from '../lib/validate';
import data from '../testdata';

describe('convert Unit testing', () => {
  it('ipToInt return int', () => {
    const res = convert.ipToInt(data.ip01);
    expect(validate.isInteger(res)).toBeTruthy();
  });

  it('intToIP return string', () => {
    const res = convert.intToIP(data.int01);
    expect(validate.isString(res)).toBeTruthy();
  });
});
