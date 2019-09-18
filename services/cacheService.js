const defaultService = {
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
 * @property {function} wipe
 *
 * Return a service object for storing, retrieving, deleting cached items.
 * @returns {CacheService}
 */
const getService = () => {
  // Memoize client connection, so it can reused.
  if (service) {
    return service;
  }

  // Redis env variables have not been configured.
  if (! process.env.REDIS_URL) {
    return defaultService;
  }

  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (! process.env.BROWSER) {
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
    };

    return service;
  }

  return defaultService;
};

module.exports = getService;
