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
  const PettyCache = require('petty-cache');

  const redisClient = new Redis({
    data: mockRedisDatabase,
  });

  const pettyCache = new PettyCache(redisClient);

  return {
    client: redisClient,
    petty: pettyCache,
    get(key) {
      return JSON.parse(this.petty.get(key));
    },
    set(key, value) {
      return this.petty.set(
        key,
        JSON.stringify(value),
        'EX',
        300
      );
    },
    del(key) {
      return this.petty.del(key);
    },
  };
};

module.exports = cacheService;
