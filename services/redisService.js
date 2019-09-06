const defaultService = {
  get: () => null,
  set: () => {},
  del: () => null,
  wipe: () => null,
};

let service;

/**
 * Get Redis service.
 *
 * @typedef {object} CacheService
 * @property {function} get
 * @property {function} set
 *
 * Return a service object for storing and retrieving cached items.
 * @returns {CacheService}
 */
const getRedisService = () => {
  // Memoize client connection, so it can reused.
  if (service) {
    return service;
  }

  // Redis env variables have not been configured.
  if (! process.env.REDIS_URL) {
    return defaultService;
  }

  let Redis;
  // Check if optional redis client is installed.
  try {
    Redis = require('ioredis'); // eslint-disable-line global-require
  } catch (err) {
    return defaultService;
  }

  const client = new Redis(process.env.REDIS_URL);
  client.on('error', (err) => {
    console.error(err); // eslint-disable-line no-console
  });

  service = {
    client,
    async get(key) {
      return JSON.parse(await this.client.get(key));
    },
    set(key, value) {
      return this.client.set(
        key,
        JSON.stringify(value),
        'EX',
        process.env.CACHE_EXPIRE || 300
      );
    },
    del(key) {
      return this.client.del(key);
    },
    wipe() {
      return this.client;
    },
  };

  return service;
};

module.exports = getRedisService;
