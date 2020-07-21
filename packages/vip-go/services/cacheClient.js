/* eslint-disable global-require */
const defaultService = require(
  '@irvingjs/core/services/cacheService/defaultService'
)();

/**
 * @typedef {object} CacheService
 * @property {function} get
 * @property {function} set
 *
 * Return a service object for storing and retrieving cached items.
 * @returns {CacheService}
 */
const getClient = () => {
  const { redis, logger } = require('@automattic/vip-go');
  const client = redis({
    logger: logger('irving:redis'),
  });

  if (! client) {
    return defaultService;
  }

  return client;
};

module.exports = getClient;
