import browser from '../lib/browser';
import validate from '../lib/validate';
import data from '../testdata';

describe('browser Unit testing', () => {
  it('getSiteUrl should working', () => {
    const res = browser.getSiteUrl(data.url01);
    expect(res != '').toBeTruthy();
  });

  it('getDomain should working', () => {
    const res1 = browser.getDomain(data.url01);
    const res2 = browser.getDomain(data.url01, true);
    const chk = res1.indexOf(res2) > 1;

    expect(res1 != '').toBeTruthy();
    expect(res2 != '').toBeTruthy();
    expect(chk).toBeTruthy();
  });

  it('getQueryByName(x,y,false) should return from query', () => {
    const res = browser.getQueryByName('q', data.url02, false);
    expect(!validate.isNull(res)).toBeTruthy();
  });
  it('getQueryByName(x,y,true) should return from hash when query empty', () => {
    const res = browser.getQueryByName('q', data.url01, true);
    expect(!validate.isNull(res)).toBeTruthy();
  });
  it('getQueryByName("",y,true) should return object', () => {
    const res = browser.getQueryByName('', data.url03, true);
    expect(validate.isObject(res)).toBeTruthy();
  });
});
