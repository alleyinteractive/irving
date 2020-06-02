/* eslint-disable global-require */
const defaultService = require('./defaultService');
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
  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const getClient = require('@irvingjs/services/cacheClient'); // this is an alias.
    const cacheClient = getClient();
    let Stampede;

    if (! cacheClient) {
      return defaultService;
    }

    // Check if optional redis client and cache-stampede are installed.
    try {
      // eslint-disable-next-line global-require
      Stampede = require('cache-stampede/stampede');
    } catch (err) {
      return defaultService;
    }

    const get = async (key) => JSON.parse(await cacheClient.get(key));

    const set = async (key, value) => cacheClient.set(
      key,
      JSON.stringify(value),
      'EX',
      process.env.CACHE_EXPIRE || 300
    );

    const del = (key) => cacheClient.del(key);

    /**
     * @todo this will probably only work for ioredis, but since stampede has adapters for various clients,
     * this is something we could change in the future potentially.
     */
    const clientAdapter = {
      client: cacheClient,
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
      upsert: null,
      adapter: clientAdapter,
    });

    service = {
      ...clientAdapter,
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
