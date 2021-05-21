import fetchMock from 'fetch-mock-jest';
import fetchComponentData, {
  cacheResult,
} from './fetchComponentData';
import cacheService from './cacheService';

jest.mock('ioredis');

const cache = cacheService();
const endpoint = 'https://foo.com/api';
const content = {
  data: 'random content',
};

beforeEach(() => {
  fetchMock.restore();
});

describe('fetchComponentData', () => {
  it(
    'should return proper uncached response',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.mock(endpoint, content);

      const result = await fetchComponentData(endpoint);

      expect(result).toBeDefined();
      expect(result).toEqual(content);

      done();
    }
  );
});

describe('cacheResult', () => {
  it(
    'should return cached response',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get(endpoint, content);

      const result = await cacheResult(endpoint);

      expect(result).toBeDefined();
      expect(result).toEqual(content);

      // Getting directly from cache.
      expect(await cache.get(endpoint)).toEqual(content);

      done();
    }
  );

  it(
    'should return true meaning the cache stampede works',
    async (done) => {
      // Throws an error if the request doesn't match.
      fetchMock.get(endpoint, content);

      const results = await Promise.all(
        [...Array(100)].map(
          async () => (
            new Promise(
              (resolve) => setTimeout(
                async () => resolve(await cacheResult(endpoint)),
                100
              )
            )
          )
        )
      );

      expect(results.every(item => item.data === content.data)).toBeTruthy();
      done();
    }
  );
});
