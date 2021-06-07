import fetchMock from 'fetch-mock-jest';
import cachedFetchComponents, {
  fetchComponents,
} from 'services/fetchComponents';
import cacheService from './cacheService';
import createEndpointUrl from '../utils/endpoint/createEndpointUrl';

jest.mock('ioredis');

const hostname = 'multisite-one.irving.test';
const cache = cacheService();
const endpoint = createEndpointUrl({
  hostname,
  path: '/cache',
  search: '&bar=baz',
  cookie: {},
  context: 'page'
});
const cacheKey = `components-endpoint:${endpoint}`;

beforeEach(() => {
  cache.del(cacheKey);
  fetchMock.restore();
});

describe('fetchComponents', () => {
  it(
    'should return a network (invalid API) 404',
    async (done) => {
      expect(await fetchComponents(
        { hostname: 'starwars.com', path: '/foo'},
        {},
      )).toEqual({
          apiValid: false,
          defaults: [],
          page: [],
          providers: [],
          status: 404,
      });
      done();
    }
  );
});

describe('cachedFetchComponents', () => {
  const hostname = 'multisite-one.irving.test';

  it(
    'should get fetch response from cache',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://irving-multisite.test/api/components', {}, {
        query: {
          path: '/cache',
          context: 'page',
          bar: 'baz',
        },
      });

      const result = await cachedFetchComponents({
        hostname,
        path: '/cache',
        search: '?bar=baz',
        cookie: {},
        context: 'page',
      }, {});
      expect(result).toBeDefined();

      // Getting directly from cache.
      const getCached = await cache.get(cacheKey);
      expect(result).toEqual(getCached);

      // Second Request.
      const firstCachedResponse = await cachedFetchComponents({
        hostname,
        path: '/cache',
        search: '?bar=baz',
      }, {});
      expect(result).toEqual(firstCachedResponse);

      // Third Request.
      const secondCachedResponse = await cachedFetchComponents({
        hostname,
        path: '/cache',
        search: '?bar=baz',
        cookie: {},
        context: 'page',
      }, {});
      expect(result).toEqual(secondCachedResponse);
      done();
    }
  );

  it(
    'should bypasse the cache',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://irving-multisite.test/api/components', {}, {
        query: {
          path: '/cache',
          context: 'page',
          bar: 'baz',
        },
      });

      const result = await cachedFetchComponents({
        hostname,
        path: '/cache',
        search: '?bar=baz',
        cookie: { bypassCache: true },
      }, {});

      expect(result).toBeDefined();
      expect(result.data).toBeUndefined();
      done();
    }
  );

  it(
    'should return true meaning the cache stampede works',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get('https://irving-multisite.test/api/components', {}, {
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
                async () => resolve(await cachedFetchComponents({
                  hostname,
                  path: '/cache',
                  search: '?bar=baz',
                })),
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
