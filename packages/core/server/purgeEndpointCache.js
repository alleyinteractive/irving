const queryString = require('query-string');
const cacheService = require('../services/cacheService')();

/**
 * Bust page/post/endpoint cache from Redis.
 *
 * @param {object} req  Request object.
 * @param {object} res  Response object.
 * @returns {*}
 */
const purgeEndpointCache = async (req, res) => {
  const endpoint = req.originalUrl;
  const key = queryString.stringify({
    path: endpoint,
    context: 'site',
  }, {
    encode: false,
    sort: false,
  });
  let keysDeleted = 0;

  // Find all keys that start with the key we received.
  const stream = cacheService.client.scanStream({
    match: `components-endpoint:${key}*`,
  });

  stream.on('data', async (keys) => {
    if (keys.length) {
      const pipeline = cacheService.client.pipeline();
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

module.exports = purgeEndpointCache;
