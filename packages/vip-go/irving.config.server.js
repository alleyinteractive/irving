const startServer = require('./server/startServer');
const cacheService = require('./services/cacheService');
const logService = require('./services/logService');
const monitorService = require('./services/monitorService');

module.exports = {
  name: 'vip-go',
  startServer,
  cacheService,
  logService,
  monitorService,
};
