const getRedisService = require('../services/redisService');

/**
 * Bust the entire cache from Redis.
 *
 * @param {Request}  req  Request.
 * @param {Response} res  Response.
 */
const bustCache = async (req, res) => {
  // Get Cache Service.
  const service = getRedisService();

  // Get Redis object.
  const cache = service.wipe();

  // Create a readable stream (object mode).
  // This approach is better for performance.
  const stream = await cache.scanStream();

  stream.on('data', async (keys) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = cache.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    }
  });

  stream.on('end', () => res.json('Entire Redis cache wiped out.'));
};

module.exports = bustCache;
