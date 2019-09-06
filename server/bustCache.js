const getRedisService = require('../services/redisService');

const bustPageCache = (req, res) => {
  const { endpoint } = req.query;

  // The endpoint is the key.
  const key = endpoint;
  const cache = getRedisService();

  const hasCache = cache.get(key);
  if (! hasCache) {
    res.json('No cache to bust.').sendStatus(200);
  }

  // Delete cache.
  cache.del(key);

  // Send message.
  res.json('Cached busted.').sendStatus(200);
};

const bustCache = (req, res) => {
  // Get Cache Service.
  const service = getRedisService();

  // Get Redis object.
  const cache = service.wipe();

  // Create a readable stream (object mode).
  // This approach is better for performance.
  const stream = cache.scanStream({
    // Map all the keys. As we don't know,
    // and save them in a specific pattern.
    match: '*',
  });

  stream.on('data', (keys) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = cache.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    } else {
      res.json('No cache to wipe.');
    }
  });
  stream.on('end', () => {
    res.json('Entire Redis cache wiped out.');
  });
};

module.exports = bustCache;
module.exports = bustPageCache;
