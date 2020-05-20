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

  const redis = new Redis({
    data: mockRedisDatabase,
  });

  return {
    client: redis,
    get(key) {
      return JSON.parse(this.redis.get(key));
    },
    set(key, value) {
      return this.redis.set(
        key,
        JSON.stringify(value),
        'EX',
        300
      );
    },
    del(key) {
      return this.redis.del(key);
    },
  };
};

module.exports = cacheService;
