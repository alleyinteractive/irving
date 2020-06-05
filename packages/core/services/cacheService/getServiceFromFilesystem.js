const getConfigFromFiles = require('../../config/getConfigFromFiles');
const { appRoot } = require('../../config/paths');
const coreCacheService = require('.');
const defaultCacheService = require('./defaultService');

/**
 * Get the configured cache service or use core's service.
 */
const getService = () => {
  const service = getConfigFromFiles(
    'services/cacheService.js',
    appRoot,
    coreCacheService
  )();

  if (! service) {
    return defaultCacheService;
  }

  return service;
};

module.exports = getService;
