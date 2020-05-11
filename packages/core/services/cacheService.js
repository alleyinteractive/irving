const getConfigField = require('../utils/getConfigField');
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
  const hostAndPort = process.env.REDIS_MASTER || process.env.REDIS_URL || '';
  const password = process.env.REDIS_PASSWORD || null;

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
  if (! hostAndPort) {
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

    // Must be in the format `host:port`
    if (! hostAndPort || ! hostAndPort.match(/^[\w\-_.]+:\d+$/)) {
      return defaultService;
    }

    const [host, port] = hostAndPort.split(':');
    const client = new Redis({
      host,
      port,
      password,
      retryStrategy,
      enableOfflineQueue: true,
      maxRetriesPerRequest: process.env.QUEUED_CONNECTION_ATTEMPTS,
    });

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
