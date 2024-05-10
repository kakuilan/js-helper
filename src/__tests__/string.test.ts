import string from '../lib/string';
import data from '../testdata';

describe('string Unit testing', () => {
  it('str2Bytes return a UTF-8 “byte” array', () => {
    const arr = string.str2Bytes(data.strTest);
    const str = string.bytes2Str(arr);
    expect(str).toBe(data.strTest);
  });

  it('getFileExt return file extension', () => {
    const res1 = string.getFileExt('50.xsl');
    const res2 = string.getFileExt('a.B');
    const res3 = string.getFileExt('.gitignore');
    const res4 = string.getFileExt('error');
    const res5 = string.getFileExt('');
    const res6 = string.getFileExt('a.b.c.d');
    const res7 = string.getFileExt('.a.b');
    const res8 = string.getFileExt('a..b');
    const res9 = string.getFileExt(data.url09);
    const res10 = string.getFileExt(data.url10);

    expect(res1).toBe('xsl');
    expect(res2).toBe('b');
    expect(res3).toBe('');
    expect(res4).toBe('');
    expect(res5).toBe('');
    expect(res6).toBe('d');
    expect(res7).toBe('b');
    expect(res8).toBe('b');
    expect(res9).toBe('php');
    expect(res10).toBe('html');
  });
});
