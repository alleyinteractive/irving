const getService = require('../services/cacheService');

/**
 * Bust page/post/endpoint cache from Redis.
 *
 * @param {Request}  req  Request.
 * @param {Response} res  Response.
 */
const bustPageCache = async (req, res) => {
  const { endpoint } = req.query;

  // Endpoint is required.
  if (! endpoint) {
    return res.json('Required param (endpoint) missing.');
  }

  // The endpoint is the key.
  const key = endpoint;
  const service = getService();

  const hasCache = await service.get(key);
  if (! hasCache) {
    return res.json('No cache to bust.');
  }

  // Delete cache.
  service.del(key);

  return res.json('Endpoint cache deleted.');
};

module.exports = bustPageCache;
