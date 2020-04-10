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
  // Killing redis for now. Ticket MIT-977.
  // MIT is experience delay issues with previewing changes to content on the site,
  // and this is a headache for editorial. Headless recommends killing redis as the
  // first attempt to improve things.
  return defaultService;
  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  // eslint-disable-next-line no-unreachable
  if (! process.env.BROWSER && 'test' !== process.env.NODE_ENV) {
    const { redis: getVipRedis } = require('@automattic/vip-go'); // eslint-disable-line global-require
    const client = getVipRedis();

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
};

module.exports = getService;
