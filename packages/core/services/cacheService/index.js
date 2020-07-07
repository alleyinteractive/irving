/* eslint-disable global-require */
const defaultService = require('./defaultService')();
let service;
let getClient;

if (process.env.IRVING_EXECUTION_CONTEXT) {
  getClient = require('@irvingjs/services/cacheClient'); // this is an alias.
} else {
  const getValueFromFiles = require('../../config/irving/getValueFromFiles');
  const coreCacheClient = require('./cacheClient');

  getClient = getValueFromFiles(
    'services/cacheClient',
    coreCacheClient
  );
}

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
};

module.exports = getService;
