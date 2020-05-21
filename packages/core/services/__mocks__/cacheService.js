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

/**
 * Mocks the Redis cache service with an instance of ioredis-mock.
 */
const cacheService = () => {
  // eslint-disable-next-line global-require
  const Redis = require('ioredis-mock');
  const Stampede = require('cache-stampede');

  const client = new Redis({
    data: mockRedisDatabase,
  });

  const get = (key) => {
    return client.get(key);
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
    insert: set,
    remove: del,
    close: () => {},
  };

  const stampedeService = Stampede({
    adapter: ioredisService
  });

  return {
    ...ioredisService,
    ...stampedeService
  };
};

module.exports = cacheService;
