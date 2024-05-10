import validate from '../lib/validate';
import data from '../testdata';

describe('validate Unit testing', () => {
  it('isUrl should working', () => {
    const res1 = validate.isUrl(data.strHello);
    const res2 = validate.isUrl(data.int01);
    const res3 = validate.isUrl(data.url01);
    const res4 = validate.isUrl(data.url02);
    const res5 = validate.isUrl(data.url03);
    const res6 = validate.isUrl(data.url04);
    const res7 = validate.isUrl(data.url05);
    const res8 = validate.isUrl(data.url06);
    const res9 = validate.isUrl(data.file01);
    const res10 = validate.isUrl(data.ip01);
    const res11 = validate.isUrl(data.url07);
    const res12 = validate.isUrl(data.url08);

    expect(res1).toBeFalsy();
    expect(res2).toBeFalsy();
    expect(res3).toBeTruthy();
    expect(res4).toBeTruthy();
    expect(res5).toBeFalsy();
    expect(res6).toBeTruthy();
    expect(res7).toBeFalsy();
    expect(res8).toBeFalsy();
    expect(res9).toBeFalsy();
    expect(res10).toBeFalsy();
    expect(res11).toBeTruthy();
    expect(res12).toBeTruthy();
  });
});
