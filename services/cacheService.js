const defaultService = {
  get: () => null,
  set: () => {},
  del: () => null,
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

    return {
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
      del(key) {
        return this.client.del(key);
      },
    };
  }

  return defaultService;
};

module.exports = getService;
