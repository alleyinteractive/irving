const cacheService = require('../services/cacheService/getService')();

const getCacheKeys = async (req, res) => {
  const keyList = [];

  const stream = await cacheService.client.scanStream({ match: '*' });
  stream.on('data', async (keys) => {
    keys.forEach((key) => {
      keyList.push(key);
    });
  });

  stream.on('end', () => res.json(keyList));
};

module.exports = getCacheKeys;
