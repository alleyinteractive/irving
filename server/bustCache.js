const getService = require('../services/cacheService');

/**
 * Bust the entire cache from Redis.
 *
 * @param {Request}  req  Request.
 * @param {Response} res  Response.
 */
const bustCache = async (req, res) => {
  const service = getService().wipe();

  // Create a readable stream (object mode).
  // This approach is better for performance.
  const stream = await service.scanStream();

  stream.on('data', async (keys) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = service.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    } else {
      res.json('No cache data to delete.');
    }
  });

  stream.on('end', () => res.json('Entire Redis cache deleted.'));
};

module.exports = bustCache;
