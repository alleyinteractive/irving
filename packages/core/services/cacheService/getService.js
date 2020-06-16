/* eslint-disable global-require */
const getConfigField = require('../../utils/getConfigField');
const getClient = require('./getClient');
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
  const configService = getConfigField('cacheService')();

  // Set user- or package-configured cache service, if applicable.
  if (configService) {
    // Ensure all keys are present.
    service = {
      ...defaultService,
      ...configService,
    };
  }

  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (! process.env.BROWSER) {
    const cacheClient = getClient();
    let Stampede;

    if (! cacheClient) {
      return defaultService;
    }

    // Check if optional cache-stampede is installed.
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
      upsert: false,
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
