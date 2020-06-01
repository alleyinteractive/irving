const getMergedConfigFromFilesystem = require('../utils/getConfigFiles');
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
  const service = getMergedConfigFromFilesystem(
    'services/logService.js',
    coreLogService
  );

  return service;
};

/**
 * Get the configured cache service or use core's service.
 */
const getCacheService = () => {
  const service = getMergedConfigFromFilesystem(
    'services/cacheService.js',
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
  const service = getMergedConfigFromFilesystem(
    'services/monitorService.js',
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
