const getRedisService = require('../services/redisService');

/**
 * Bust page/post/endpoint cache from Redis.
 *
 * @param {Request}  req  Request.
 * @param {Response} res  Response.
 */
const bustPageCache = async (req, res) => {
  const { endpoint } = req.query;

  // The endpoint is the key.
  const key = endpoint;
  const cache = getRedisService();

  const hasCache = await cache.get(key);
  if (! hasCache) {
    return res.json('No cache to bust.');
  }

  // Delete cache.
  cache.del(key);

  // Send message.
  return res.json('Cached busted.');
};

module.exports = bustPageCache;
