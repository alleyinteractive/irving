/**
 * Test redis database.
 */
/* eslint-disable max-len */
const mockRedisDatabase = {
  'components-endpoint:path=/&context=site': 'data',
  'components-endpoint:path=/test-page&context=site': 'data',
  'components-endpoint:path=/test-page&context=site&extra-parameter=2': 'data',
  'components-endpoint:path=/test-page&context=site&extra-parameter=3': 'data',
  'components-endpoint:path=/test-article&context=site': 'data',
  'components-endpoint:path=/test-article/&context=site': 'data',
  'components-endpoint:path=/test-term&context=site': 'data',
  'components-endpoint:path=/test-term&context=site&another-param': 'data',
  'components-endpoint:path=/test-test-test': 'data',
};
/* eslint-enable max-len */

let service;

/**
 * Mocks the Redis cache service with an instance of ioredis-mock.
 */
const cacheService = () => {

  // Memoize client connection, so it can reused.
  if (service) {
    return service;
  }

  // eslint-disable-next-line global-require
  const Redis = require('ioredis-mock');
  const Stampede = require('cache-stampede/stampede');

  const client = new Redis({
    data: mockRedisDatabase,
  });

  const get = async (key) => {
    return JSON.parse(await client.get(key));
  };

  const set = (key, value) => {
    return client.set(
      key,
      JSON.stringify(value),
      'EX',
      process.env.CACHE_EXPIRE || 300
    );
  };

  const del = (key) => {
    return client.del(key);
  };

  const ioredisService = {
    client,
    get,
    set,
    del,
    update: set,
    insert: set,
    remove: del,
    cached: () => {},
    close: () => {},
  };

  const stampedeService = new Stampede({
    upsert: false,
    adapter: ioredisService
  });

  service = {
    ...ioredisService,
    get: async (key, options, retry) => {
      let result;
      try {
        const {
          data
        } = await stampedeService.get(key, options, retry);

        result = data;
      } catch (error) {
        result = null;
      }

      return result;
    },
    set: (key, fn, options) => {
      return stampedeService.set(key, fn, options);
    },
    insert: (key, fn, options) => {
      return stampedeService.set(key, fn, options);
    },
    cached: (key, fn, options) => {
      return stampedeService.cached(key, fn, options);
    },
  };

  return service;
};

module.exports = cacheService;
