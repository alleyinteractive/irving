jest.mock('./cacheService');
const cacheService = require('./cacheService');
const cache = cacheService();

const key = `components-endpoint:path=/&context=site`;

// Set up the mocked cache service.
describe('cacheService', () => {
  it('should return an object of the correct shape', () => {
    expect(Object.keys(cache)).toMatchObject([
      'client',
      'get',
      'set',
      'del',
      'insert',
      'remove',
      'close',
      'options',
      'retryDelay',
      'maxRetries',
      'expiry',
      'passphrase',
      'algo',
      'adapter',
      'cached',
      'Promise',
    ]);
  });

  it('should return empty/null value from an uncached key', async (done) => {
    const value = await cache.get('testKey');

    expect(value).toEqual(null);

    done();
  });

  it('should return non-empty valule from a valid cached key', async (done) => {
    const value = await cache.get(key);

    expect(value).toEqual('data');

    done();
  });

  it('should return non-empty value after a key was cached with an object', async (done) => {
    const testKey = 'testKey';
    const testValue = {
      data: 'test',
    };

    await cache.set(testKey, testValue);

    const value = await cache.get(testKey);

    expect(value).toBe(JSON.stringify(testValue));

    done();
  });

  it('should return non-empty value after key was cached with a string', async (done) => {
    const key = 'testKey';

    await cache.set(key, 'data');

    const value = await cache.get(key);

    expect(value).toBe(JSON.stringify('data'));

    done();
  });

  it('should return non-empty value after the cache expired', async (done) => {
    jest.useFakeTimers();
    const key = 'testKey';

    await cache.insert(key, 'timed-data', 200);

    setTimeout(async () => {
      const value = await cache.get(key);

      expect(value).toBe(JSON.stringify('timed-data'));
    }, 300);

    jest.runAllTimers();

    done();
  });
});
