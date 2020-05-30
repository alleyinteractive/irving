/* eslint-disable global-require */
/**
 * @typedef {object} CacheService
 * @property {function} get
 * @property {function} set
 *
 * Return a service object for storing and retrieving cached items.
 * @returns {CacheService}
 */
const getClient = () => {
  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (! process.env.BROWSER) {
    const { redis, logger } = require('@automattic/vip-go');
    const client = redis({
      logger: logger('irving:redis'),
    });

    if (! client) {
      return null;
    }

    return client;
  }

  return null;
};

module.exports = getClient;
