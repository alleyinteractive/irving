const { appRoot } = require('../config/paths');
const { getConfigFromFiles } = require('../config/getConfigFromFiles');
const coreLogService = require('./logService');
const coreMonitorService = require('./monitorService');
const defaultMonitorService = require('./monitorService/defaultService');
const coreCacheService = require('./cacheService');
const defaultCacheService = require('./cacheService/defaultService');

/** CONTEXT: NODE-ONLY */

/**
 * Get the configured log service or use core's service.
 */
const getLogService = () => {
  const service = getConfigFromFiles(
    'services/logService.js',
    appRoot,
    coreLogService
  );

  return service;
};

/**
 * Get the configured cache service or use core's service.
 */
const getCacheService = () => {
  const service = getConfigFromFiles(
    'services/cacheService.js',
    appRoot,
    coreCacheService
  );

  if (! service) {
    return defaultCacheService;
  }

  return service;
};

/**
 * Get the configured monitor service or use core's service.
 */
const getMonitorService = () => {
  const service = getConfigFromFiles(
    'services/monitorService.js',
    appRoot,
    coreMonitorService
  );

  if (! service) {
    return defaultMonitorService;
  }

  return service;
};

module.exports = {
  getLogService,
  getCacheService,
  getMonitorService,
};
