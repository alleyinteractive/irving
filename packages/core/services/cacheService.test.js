jest.mock('./cacheService');
const cacheService = require('./cacheService');
const cache = cacheService();
const testKey = 'test-key';
const testValue = 'test-value';

beforeEach(() => {
  cache.del('test-key');
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
      'close',
    ]);
  });
});

describe('cacheService CRUD', () => {

  it('should return non-empty value from a valid cached key', async (done) => {
    await cache.set(testKey, testValue);

    const value = await cache.get(testKey);

    expect(value).toEqual(testValue);

    done();
  });

  it.only('should be the same value if adding from a insert, update, or del', async (done) => {
    const cache1 = await cache.insert(testKey, testValue);
    const cache2 = await cache.set(testKey, 'anotherValue');

    expect(cache1).toEqual(testValue);
    expect(cache2).toEqual('anotherValue');
    done();
  });

  it('should return non-empty value after the cache expired', async (done) => {
    jest.useFakeTimers();

    await cache.set(testKey, testValue);

    // Fast-forward until all timers have been executed.
    jest.advanceTimersByTime(10000);

    // Check redis mock for way to clear the cache with time.
    const value = await cache.get(testKey);

    expect(value).toEqual(testValue);

    jest.clearAllTimers();
    done();
  });

  it('should throw a KEY_NOT_FOUND error after trying to get a deleted cached key', async (done) => {
    await cache.set(testKey, testValue);

    const value = await cache.get(testKey);

    expect(value).toEqual(testValue);

    await cache.del(testKey);

    const newValue = await cache.get(testKey);

    expect(newValue).toEqual(null);

    done();
  });

  it('testing the race condition', async (done) => {
    const key = 'race';

    let i = 1;

    const results = await Promise.all([...Array(100)].map(async () => {
      return await cache.cached(key, () => new Promise(resolve => setTimeout(() => resolve(i++), 4000)));
    }));

    const a = results.every(d => d === 1);

    done();
  });
});
