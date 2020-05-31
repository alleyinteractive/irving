const getConfigField = require('../utils/getConfigField');
const getRedisOptions = require('./utils/getRedisOptions');
const defaultService = {
  client: {},
  get: () => null,
  set: () => {},
  del: () => null,
  insert: () => null,
  remove: () => null,
  cached: () => {},
  close: () => {},
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
  if (! host || ! port) {
    return defaultService;
  }

  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (!process.env.BROWSER) {
    let Redis;
    let Stampede;

    // Check if optional redis client and cache-stampede are installed.
    try {
      // eslint-disable-next-line global-require
      Redis = require('ioredis');

      // eslint-disable-next-line global-require
      Stampede = require('cache-stampede/stampede');
    } catch (err) {
      return defaultService;
    }

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

    const get = async (key) => JSON.parse(await client.get(key));

    const set = async (key, value) => client.set(
      key,
      JSON.stringify(value),
      'EX',
      process.env.CACHE_EXPIRE || 300
    );

    const del = (key) => client.del(key);

    const ioredisService = {
      client,
      get,
      set,
      del,
      update: set,
      insert: set,
      remove: del,
      cached: () => {},
      close: () => {},
    };

    const stampedeService = new Stampede({
      upsert: false,
      adapter: ioredisService,
    });

    service = {
      ...ioredisService,
      get: async (key, options, retry) => {
        let result;
        try {
          const {
            data,
          } = await stampedeService.get(key, options, retry);

          result = data;
        } catch (error) {
          result = null;
        }

        return result;
      },
      set: (key, fn, options) => stampedeService.set(key, fn, options),
      insert: (key, fn, options) => stampedeService.set(key, fn, options),
      cached: (key, fn, options) => stampedeService.cached(key, fn, options),
    };

    return service;
  }

  return defaultService;
};

module.exports = getService;
