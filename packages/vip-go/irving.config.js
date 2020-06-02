const cacheClient = require('./services/cacheClient');
const logService = require('./services/logService');
const monitorService = require('./services/monitorService');

module.exports = {
  name: 'vip-go',
  trailingSlashDenylist: [
    '/cache-healthcheck',
  ],
  cacheClient,
  logService,
  monitorService,
};
