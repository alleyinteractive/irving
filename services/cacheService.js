const { REDIS_URL: url, CACHE_EXPIRE: expire = 300 } = process.env;

let service;
const defaultService = {
  get: () => null,
  set: () => {},
};

/**
 * @typedef {object} CacheService
 * @property {function} get
 * @property {function} set
 *
 * Return a service object for storing and retrieving cached items.
 * @returns {CacheService}
 */
const getService = () => {
  // Memoize client connection, so it can reused.
  if (service) {
    return service;
  }

  // Redis env variables have not been configured.
  if (! url) {
    return defaultService;
  }

  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (! process.env.BROWSER) {
    const Redis = require('ioredis'); // eslint-disable-line global-require
    const client = new Redis(url);
    client.on('error', (err) => {
      console.error(err); // eslint-disable-line no-console
    });

    service = {
      client,
      async get(key) {
        return JSON.parse(await this.client.get(key));
      },
      set(key, value) {
        return this.client.set(key, JSON.stringify(value), 'EX', expire);
      },
    };

    return service;
  }

  return defaultService;
};

export default getService;
