const startServer = require('./server/startServer');
const cacheClient = require('./services/cacheClient');
const logService = require('./services/logService');
const monitorService = require('./services/monitorService');

module.exports = {
  name: 'vip-go',
  startServer,
  cacheClient,
  logService,
  monitorService,
};
