const getService = require('../services/cacheService');

/**
 * Bust page/post/endpoint cache from Redis
 * on a PURGE request.
 *
 * @param {object}   req  Request.
 * @param {object}   res  Response.
 * @param {function} next Next.
 * @returns {*}
 */
const purgePageCache = async (req, res, next) => {
  const key = req.originalUrl;
  const service = getService();
  const hasCache = await service.get(key);

  // Move on if there is no cache.
  if (! hasCache) {
    return next();
  }

  // Delete cache.
  service.del(key);

  // Deleted?! Them, move on.
  return next();
};

module.exports = purgePageCache;
