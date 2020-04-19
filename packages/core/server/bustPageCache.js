const getService = require('../services/cacheService');

/**
 * Bust page/post/endpoint cache from Redis.
 *
 * @param {object} req  Request object.
 * @param {object} res  Response object.
 * @returns {*}
 */
const bustPageCache = async (req, res) => {
  const { endpoint } = req.query;

  // Endpoint is required.
  if (! endpoint) {
    res.json('Required param (endpoint) missing.');
    return;
  }

  // The endpoint is the key.
  const key = endpoint;
  const service = getService();
  let keysDeleted = 0;

  // Find all keys that start with the key we received.
  const stream = service.client.scanStream({
    match: `components-endpoint:${key}*`,
  });

  stream.on('data', async (keys) => {
    if (keys.length) {
      const pipeline = service.client.pipeline();
      keysDeleted += keys.length;

      keys.forEach((foundKey) => {
        pipeline.del(foundKey);
      });
      pipeline.exec();
    }
  });

  stream.on('end', () => {
    if (0 === keysDeleted) {
      res.json('No cache to bust.');
      return;
    }

    res.json(`Endpoint cache deleted, matched ${keysDeleted} keys.`);
  });
};

module.exports = bustPageCache;
