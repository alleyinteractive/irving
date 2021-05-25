const path = require('path');
const { irvingRoot } = require('../paths');
const resolveConfigFilepath = require('./resolveConfigFilepath');

/**
 * Convert config paths into aliases.
 *
 * @param {string} target What target is this executing for (web or node)?
 */
const getServiceAliases = (target) => {
  /**
   * Get cache client.
   *
   * web: return path to default cache client
   * node: return path to configured cache client
   * undefined: return path to core's cache client
   */
  let cacheClientValue = resolveConfigFilepath('services/cacheClient');
  if (target === 'web') {
    cacheClientValue = path.join(
      irvingRoot,
      'services/cacheService/defaultClient.js',
    );
  } else if (!cacheClientValue) {
    cacheClientValue = path.join(
      irvingRoot,
      'services/cacheService/cacheClient.js',
    );
  }

  /**
   * Get cache service.
   *
   * web: return path to default cache service
   * node: return path to configured cache service
   * undefined: return path to core's cache service
   */
  let cacheServiceValue = resolveConfigFilepath('services/cacheService');
  if (target === 'web') {
    cacheServiceValue = path.join(
      irvingRoot,
      'services/cacheService/defaultService.js',
    );
  } else if (!cacheServiceValue) {
    cacheServiceValue = path.join(
      irvingRoot,
      'services/cacheService/index.js',
    );
  }

  /**
   * Get monitor service.
   *
   * web: return path to default monitor service
   * node: return path to configured monitor service
   * undefined: return path to core's monitor service
   */
  let monitorServiceValue = resolveConfigFilepath('services/monitorService');
  if (target === 'web') {
    monitorServiceValue = path.join(
      irvingRoot,
      'services/monitorService/defaultService.js',
    );
  } else if (!monitorServiceValue) {
    monitorServiceValue = path.join(
      irvingRoot,
      'services/monitorService/index.js',
    );
  }

  /**
   * Get monitor service.
   *
   * web and node: return path to configured log service
   * undefined: return path to core's log service
   */
  let logServiceValue = resolveConfigFilepath('services/logService');
  if (!logServiceValue) {
    logServiceValue = path.join(
      irvingRoot,
      'services/logService/index.js',
    );
  }

  return {
    '@irvingjs/services/cacheClient': cacheClientValue,
    '@irvingjs/services/cacheService': cacheServiceValue,
    '@irvingjs/services/monitorService': monitorServiceValue,
    '@irvingjs/services/logService': logServiceValue,
  };
};

module.exports = getServiceAliases;
