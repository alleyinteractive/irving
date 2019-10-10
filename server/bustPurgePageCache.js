const getService = require('../services/cacheService');

/**
 * Bust page/post/endpoint cache from Redis
 * on PURGE request.
 *
 * @param {Request}  req  Request.
 * @param {Response} res  Response.
 */
const bustPurgePageCache = async (req, res, next) => {
  const key = req.originalUrl;
  const service = getService();
  const hasCache = await service.get(key);

  if (! hasCache) {
    return res.json('No cache to bust.');
  }

  // Delete cache.
  service.del(key);

  // Deleted?! Them, move on.
  return next();
};

module.exports = bustPurgePageCache;
