const cacheService = require('./services/cacheService');
const logService = require('./services/logService');
const monitorService = require('./services/monitorService');

module.exports = {
  name: 'vip-go',
  trailingSlashDenylist: [
    '/cache-healthcheck',
  ],
  cacheService,
  logService,
  monitorService,
};
