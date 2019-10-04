const createServer = require('./server/createServer');
const cacheService = require('./services/cacheService');
const logService = require('./services/logService');
const monitorService = require('./services/monitorService');

module.exports = {
  name: 'vip-go',
  createServer,
  cacheService,
  logService,
  monitorService,
};
