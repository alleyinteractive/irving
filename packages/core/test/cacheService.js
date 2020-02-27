/**
 * Test redis database.
 */
const mockRedisDatabase = {
  'path=/&context=site': 'some data',
  'path=/test-page&context=site&extra-parameter=1': 'more data',
  'path=/test-page&context=site&extra-parameter=2': 'more data',
  'path=/test-page&context=site&extra-parameter=3': 'more data',
};

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
    async get(key) {
      return JSON.parse(await this.client.get(key));
    },
    set(key, value) {
      return this.client.set(
        key,
        JSON.stringify(value),
        'EX',
        300
      );
    },
    del(key) {
      return this.client.del(key);
    },
  };
};

module.exports = cacheService;
