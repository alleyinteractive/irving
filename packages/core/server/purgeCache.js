const cacheService = require('../services/cacheService')();

/**
 * Bust the entire cache from Redis.
 *
 * @param {object} req  Request object.
 * @param {object} res  Response object.
 * @returns {*}
 */
const purgeCache = async (req, res) => {
  // Create a readable stream (object mode).
  // This approach is better for performance.
  const stream = await cacheService.client.scanStream();

  stream.on('data', async (keys) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = cacheService.client.pipeline();
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

module.exports = purgeCache;
