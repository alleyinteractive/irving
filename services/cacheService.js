const getVipRedis = require('@automattic/vip-go');
const getLogService = require('./logService');
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
    const client = getVipRedis({ logger: getLogService('irving:redis') });

    if (! client) {
      return defaultService;
    }

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
          process.env.CACHE_EXPIRE || 300
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
