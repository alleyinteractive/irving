const getConfigField = require('../utils/getConfigField');
const getRedisOptions = require('./utils/getRedisOptions');
const defaultService = {
  client: {},
  get: () => null,
  set: () => {},
  del: () => null,
};
let service;

/**
 * @typedef {object} CacheService
 * @property {function} get
 * @property {function} set
 * @property {function} del
 *
 * Return a service object for storing, retrieving, deleting cached items.
 * @returns {CacheService}
 */
const getService = () => {
  const configService = getConfigField('cacheService')();
  const retryStrategy = (times) => (
    // Wait 2 seconds maximum before attempting reconnection
    Math.min(times * 50, 2000)
  );
  const [host, port, password] = getRedisOptions();

  // Set user- or package-configured cache service, if applicable.
  if (configService) {
    // Ensure all keys are present.
    service = {
      ...defaultService,
      ...configService,
    };
  }

  // Memoize client connection, so it can reused.
  if (service) {
    return service;
  }

  // Redis env variables have not been configured.
  if (!host || !port) {
    return defaultService;
  }

  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (!process.env.BROWSER) {
    let Redis;
    let PettyCache;

    // Check if optional redis client is installed.
    try {
      Redis = require('ioredis'); // eslint-disable-line global-require
      PettyCache = require('petty-cache');
    } catch (err) {
      return defaultService;
    }

    const redisClient = new Redis({
      host,
      port,
      password,
      retryStrategy,
      enableOfflineQueue: true,
      maxRetriesPerRequest: process.env.QUEUED_CONNECTION_ATTEMPTS,
    });

    const pettyCache = new PettyCache(redisClient);

    service = {
      client: redisClient,
      petty: pettyCache,
      async get(key) {
        return JSON.parse(await this.petty.get(key));
      },
      async set(key, value) {
        return this.petty.set(
          key,
          JSON.stringify(value), {
            ttl: process.env.CACHE_EXPIRE || 300
          }
        );
      },
      del(key) {
        return this.petty.del(key);
      },
    };

    return service;
  }

  return defaultService;
};

module.exports = getService;
