const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const coreCacheService = require('./index');
const getDefaultService = require('./defaultService');

/**
 * Get the configured cache service or use core's service.
 */
const getService = () => {
  const service = getValueFromFiles(
    'services/cacheService',
    coreCacheService,
  )();

  if (!service) {
    return getDefaultService();
  }

  return service;
};

module.exports = getService;
