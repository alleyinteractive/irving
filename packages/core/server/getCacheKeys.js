const cacheService = require('../services/cacheService')();

const getCacheKeys = async (req, res, next) => {
  if (!cacheService.client) {
    return res.send('Redis client is not configured.');
  }

  const keyList = [];
  const stream = await cacheService.client.scanStream({ match: '*' });

  stream.on('data', async (keys) => {
    keys.forEach((key) => {
      keyList.push(key);
    });
  });

  stream.on('end', () => res.json(keyList));

  return next();
};

module.exports = getCacheKeys;
