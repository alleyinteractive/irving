const createServer = require('./server/createServer');
const cacheService = require('./services/cacheService');
const debugService = require('./services/debugService');
const monitorService = require('./services/monitorService');

module.exports = {
  name: 'vip-go',
  createServer,
  cacheService,
  debugService,
  monitorService,
};
