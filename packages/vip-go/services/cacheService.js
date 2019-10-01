/**
 * @typedef {object} CacheService
 * @property {function} get
 * @property {function} set
 *
 * Return a service object for storing and retrieving cached items.
 * @returns {CacheService}
 */
const getService = () => {
  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (! process.env.BROWSER) {
    // Redis env variables have not been configured.
    if (! process.env.REDIS_MASTER) {
      return defaultService;
    }

    let Redis;
    // Check if optional redis client is installed.
    try {
      Redis = require('ioredis'); // eslint-disable-line global-require
    } catch (err) {
      return defaultService;
    }

    const [host, port] = (process.env.REDIS_MASTER).split(':');
    const opts = { host, port };

    // Add password, if configured
    if (process.env.REDIS_PASSWORD) {
      opts.password = process.env.REDIS_PASSWORD;
    }

    const client = new Redis(opts);
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
          600
        );
      },
    };

    return service;
  }

  // Caching for the browser using localForage.
  if (process.env.BROWSER) {
    // Browser-side cache expiration is configured in milliseconds.
    const cacheExpire = 600000;
    const localForage = require('localforage'); // eslint-disable-line global-require

    service = {
      client: localForage,
      async get(key) {
        const expire = await this.client.getItem(`${key}_expire`);

        // If expired, return null and make a new request.
        if (expire && new Date().getTime() >= expire) {
          return null;
        }

        // Browser storage supports JS objects/arrays.
        return this.client.getItem(key);
      },
      async set(key, value) {
        // Set a value to for cache expiration.
        await this.client.setItem(
          `${key}_expire`,
          new Date().getTime() + cacheExpire
        );

        // Set the cache. Browser storage supports JS objects/arrays.
        return this.client.setItem(key, value);
      },
    };

    return service;
  }

  return defaultService;
};

export default getService;
