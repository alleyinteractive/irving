jest.mock('./cacheService');
const cacheService = require('./cacheService');
const cache = cacheService();
const testKey = 'test-key';
const testValue = 'test-value';

beforeEach(() => {
  cache.del(testKey);
});

describe('cacheService', () => {
  it('should return an object of the correct shape', () => {
    expect(Object.keys(cache)).toMatchObject([
      'client',
      'get',
      'set',
      'del',
      'update',
      'insert',
      'remove',
      'cached',
      'close',
    ]);
  });

  it('should return a non-empty value from a valid cached key', async (done) => {
    await cache.set(testKey, testValue);

    const value = await cache.get(testKey);

    expect(value).toEqual(testValue);
    expect(value).not.toBeNull();

    done();
  });

  it('should return null when trying to get an uncached key', async (done) => {
    expect(await cache.get('invalid-test-key')).toBeNull();

    done();
  });

  it('should return null after trying to get a deleted cached key', async (done) => {
    await cache.set(testKey, testValue);

    const value = await cache.get(testKey);

    expect(value).toEqual(testValue);
    expect(value).not.toBeNull();

    await cache.del(testKey);

    expect(await cache.get(testKey)).toBeNull();

    done();
  });

  it('should return an already cached valued with the cached method', async (done) => {
    const keyValue = 'Value';

    const value = await cache.cached(testKey, () => {
      return keyValue;
    });

    expect(value).toEqual(keyValue);
    expect(value).not.toBeNull();

    const cachedValue = await cache.cached(testKey, () => {
      return 'New Value';
    });

    expect(cachedValue).toEqual(keyValue);

    done();
  });

  it('should return true meaning the cache stampede works', async (done) => {
    let i = 1;

    const results = await Promise.all(
      [...Array(100)].map(
        async () => (
          new Promise(
            (resolve) => setTimeout(
              async () => resolve(await cache.cached('race', i++)), 100
            )
          )
        )
      )
    );

    // You should get all items with 1 as result.
    expect(results.every(item => item === 1)).toBeTruthy();

    done();
  });
});
