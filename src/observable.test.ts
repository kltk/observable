import Observable from './observable';

function delay(ms: number) {
  const start = Date.now();
  while (Date.now() - start < ms);
}

const values = [0, NaN, undefined, null, {}, [], new Date(), 'string', /regex/];

describe('Observable', () => {
  test('state must equal initial value', () => {
    values.forEach(initial => {
      const o = new Observable(initial);
      expect(o.get()).toBe(initial);
    });
  });
});

describe('get', () => {
  test('get with dot path or key array', () => {
    const initial = {
      key1: 'key',
      key2: { sub: 'sub' },
      key3: { sub: { nest: 'nest' } },
    };
    const o = new Observable(initial);
    expect(o.get('key1')).toBe('key');
    expect(o.get(['key1'])).toBe('key');
    expect(o.get('key2.sub')).toBe('sub');
    expect(o.get(['key2', 'sub'])).toBe('sub');
    expect(o.get('key3.sub.nest')).toBe('nest');
    expect(o.get(['key3', 'sub', 'nest'])).toBe('nest');
  });

  test('no exists key must return undefined', () => {
    const o = new Observable();
    expect(o.get('key')).toBe(undefined);
    expect(o.get('key.sub')).toBe(undefined);
    expect(o.get('key.sub.nest')).toBe(undefined);
  });
});

describe('set', () => {
  test('set', () => {
    const o = new Observable({ key1: 1, key2: { subkey: 2 } });
    o.set(0, 'key1');
    expect(o.get('key1')).toBe(0);
    o.set(1, ['key2', 'subkey']);
    expect(o.get('key2.subkey')).toBe(1);
    o.set('value3', 'key3');
    expect(o.get('key3')).toBe('value3');
    o.set('not exist', 'key4.subkey');
    expect(o.get('key4.subkey')).toBeDefined();
    o.set(null, '');
    o.set('value', 'key5');
    expect(o.get('key5')).toBe('value');
    o.set('subvalue', 'key5.subkey');
    expect(o.get('key5.subkey')).toBe('subvalue');
  });
});

const table = ['string', null, 0, Infinity, NaN, {}, []];

describe('subscribe', () => {
  test('must call after resolve', async done => {
    const fn = jest.fn();
    const o = new Observable();
    o.subscribe(fn);
    o.set(1, []);
    o.set(2, []);
    delay(1e3);
    expect(fn).toBeCalledTimes(0);
    await Promise.resolve();
    expect(fn).toBeCalledTimes(1);
    done();
  });

  describe('do not call', () => {
    test.each(table)('do not call with same value %s', async x => {
      const fn = jest.fn();
      const o = new Observable();
      o.set(x, []);
      await Promise.resolve();
      o.subscribe(fn);
      o.set(x, []);
      await Promise.resolve();
      expect(fn).toBeCalledTimes(0);
    });
  });

  describe('must called', () => {
    test.each(table)('must called with set(%s)', async x => {
      const fn = jest.fn();
      const o = new Observable({});
      o.subscribe(fn);
      o.set(x, []);
      await Promise.resolve();
      expect(fn).toBeCalledWith(x);
    });
  });
});

describe('unsubscribe', () => {
  test('', async () => {
    const fn = jest.fn();
    const o = new Observable({});
    o.subscribe(fn);
    o.set({}, []);
    await Promise.resolve();
    expect(fn).toBeCalledTimes(1);
    o.unsubscribe(fn);
    o.set({}, []);
    await Promise.resolve();
    expect(fn).toBeCalledTimes(1);
  });
});
