import fetchMock from 'fetch-mock';
import cachedFetchComponents, {
  fetchComponents,
} from 'services/fetchComponents';
import cacheService from './cacheService';

jest.mock('ioredis');

const cache = cacheService();
const cacheKey = 'components-endpoint:path=/cache&context=page&bar=baz';

beforeEach(() => {
  process.env.API_ROOT_URL = 'https://foo.com/api';
  cache.del(cacheKey);
  fetchMock.restore();
});

describe('fetchComponents', () => {
  it(
    'should append extra query params that are defined',
    async (done) => {
      process.env.API_QUERY_PARAM_BAR = 'baz';

      // Throws an error if the request doesn't match.
      fetchMock.get(
        'https://foo.com/api/components', {}, {
          query: {
            path: '/foo',
            context: 'page',
            bar: 'baz',
          },
        }
      );

      expect(await fetchComponents('/foo')).toBeDefined();
      done();
    }
  );

  it(
    'should pass query params from the request to the api',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://foo.com/api/components', {}, {
        query: {
          path: '/foo',
          context: 'page',
          bar: 'baz',
        },
      });

      expect(await fetchComponents('/foo', '?bar=baz')).toBeDefined();
      done();
    }
  );
});

describe('cachedFetchComponents', () => {
  it(
    'should get fetch response from cached',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://foo.com/api/components', {}, {
        query: {
          path: '/cache',
          context: 'page',
          bar: 'baz',
        },
      });

      const result = await cachedFetchComponents('/cache', '?bar=baz');
      expect(result).toBeDefined();

      // Getting directly from cache.
      const getCached = await cache.get(cacheKey);
      expect(result).toEqual(getCached);

      // Second Request.
      const firstCachedResponse = await cachedFetchComponents('/cache', '?bar=baz');
      expect(result).toEqual(firstCachedResponse);

      // Third Request.
      const secondCachedResponse = await cachedFetchComponents('/cache', '?bar=baz');
      expect(result).toEqual(secondCachedResponse);
      done();
    }
  );

  it(
    'should bypasse the cache',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://foo.com/api/components', {}, {
        query: {
          path: '/cache',
          context: 'page',
          bar: 'baz',
        },
      });

      const result = await cachedFetchComponents('/cache', '?bar=baz', {
        bypassCache: true
      });

      expect(result).toBeDefined();
      expect(result.data).toBeUndefined();
      done();
    }
  );

  it(
    'should return true meaning the cache stampede works',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://foo.com/api/components', {}, {
        query: {
          path: '/cache',
          context: 'page',
          bar: 'baz',
        },
      });

      const results = await Promise.all(
        [...Array(100)].map(
          async () => (
            new Promise(
              (resolve) => setTimeout(
                async () => resolve(await cachedFetchComponents('/cache', '?bar=baz')),
                  100
              )
            )
          )
        )
      );

      expect(results.every(item => item.status === 200)).toBeTruthy();
      done();
    }
  );
});
