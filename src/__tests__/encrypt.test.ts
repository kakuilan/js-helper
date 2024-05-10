import constant from '../lib/constant';
import encrypt from '../lib/encrypt';
import data from '../testdata';

describe('encrypt Unit testing', () => {
  it('md5 return 32 bit', () => {
    const res = encrypt.md5(data.strHello);
    expect(res.length).toBe(32);
  });
  it('md5 empty should be work', () => {
    const res = encrypt.md5('');
    expect(res.length).toBe(32);
    expect(res).toBe(data.strEmptyMd5);
  });
  it('md5 supports UTF-8 encoding', () => {
    const res = encrypt.md5(data.strChinese);
    expect(res).toBe('a7bac2239fcdcb3a067903d8077c4a07');
  });

  it('base64UrlDecode should return base64UrlEncode`s input', () => {
    const enc = encrypt.base64UrlEncode(data.strHello);
    const dec = encrypt.base64UrlDecode(enc);

    const e2 = encrypt.base64UrlEncode(data.url04);
    const d2 = encrypt.base64UrlDecode(e2);

    const e3 = encrypt.base64UrlEncode(data.strTest);
    const d3 = encrypt.base64UrlDecode(e3);

    expect(dec).toBe(data.strHello);
    expect(e2).toBe(
      'aHR0cHM6Ly90b29sLmdvb2dsZS5jb20ubmV0L2VuY3J5cHQ_dHlwZT00SGVsbG8gV29ybGQhIOS9oOWlve-8gQ',
    );
    expect(d2).toBe(data.url04);
    expect(e3).toBe(
      'SGVsbG8gV29ybGQhIOS9oOWlve-8jOS4lueVjO-8gU9sw6Hwn5CNIFdpdGggRW1vamlzIPCfkLPwn5Oc',
    );
    expect(d3).toBe(data.strTest);
  });

  it('authcode encode/decode should be working', () => {
    const key = data.strEmptyMd5;
    const [r1, t1] = encrypt.authcode(
      data.strHello,
      key,
      true,
      constant.TTL_ONE_DAY,
    );
    const [d1, e1] = encrypt.authcode(r1.toString(), key, false);

    //其他
    const str1 =
      '8c9eb7905a6SdXZfm-GoJpYKu6CzMgF0I-7neF-x3UKIUpYuIZSnK_2ZqaYSZlZw0Ofzwa2Bn0QZ6b4SLzSz';
    const str2 =
      'b42374af3DqX22zi207OJXsz6xP2vEXto39TPK_UzcJOdDZV0kQHPUFm5JOw-aWISFi0snglsrYtp5tpYGRuhgw50TPY8UnFSf912uZI38vGON0KHqAgCatmtdoBZ4VJI6IkHio-JLxbt8hkuCz1HCOElUkZxBMnGUle';
    const str3 =
      '52a0945eK4NyxvnjEBnPlToROzO4KLKE9VvrqtxAiLPVPDK-HkvzahyMbxydmSifc3TQIo4mbsi9gzq7vbJ64YzpB_DP';

    const [d2, e2] = encrypt.authcode(str1, key, false);
    const [d3, e3] = encrypt.authcode(str2, key, false);
    const [d4, e4] = encrypt.authcode(str3, key.substring(0, 16), false);

    expect(d1).toBe(data.strHello);
    expect(t1).toBe(e1);
    expect(d2).toBe(data.strHello);
    expect(d3).toBe(data.strHelloEmoji);
    expect(d4).toBe(data.strJson);
  });

  it('easyEncrypt should return easyDecrypt`s input', () => {
    const enc = encrypt.easyEncrypt(data.strHello, constant.VERSION);
    const dec = encrypt.easyDecrypt(enc, constant.VERSION);
    expect(dec).toBe(data.strHello);
  });
});
