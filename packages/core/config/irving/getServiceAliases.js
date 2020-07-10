const path = require('path');
const { irvingRoot } = require('../paths');
const resolveConfigFilepath = require('./resolveConfigFilepath');

/**
 * Convert config paths into aliases.
 *
 * @param {string} target What target is this executing for (web or node)?
 */
const getServiceAliases = (target) => {
  let cacheClientValue = resolveConfigFilepath('services/cacheClient');
  if ('web' === target) {
    cacheClientValue = path.join(
      irvingRoot,
      'services/cacheService/defaultClient.js'
    );
  } else if (! cacheClientValue) {
    cacheClientValue = path.join(
      irvingRoot,
      'services/cacheService/cacheClient.js'
    );
  }

  let cacheServiceValue = resolveConfigFilepath('services/cacheService');
  if ('web' === target) {
    cacheServiceValue = path.join(
      irvingRoot,
      'services/cacheService/defaultService.js'
    );
  } else if (! cacheServiceValue) {
    cacheServiceValue = path.join(
      irvingRoot,
      'services/cacheService/index.js'
    );
  }

  let monitorServiceValue = resolveConfigFilepath('services/monitorService');
  if ('web' === target) {
    monitorServiceValue = path.join(
      irvingRoot,
      'services/monitorService/defaultService.js'
    );
  } else if (! monitorServiceValue) {
    monitorServiceValue = path.join(
      irvingRoot,
      'services/monitorService/index.js'
    );
  }

  let logServiceValue = resolveConfigFilepath('services/logService');
  if (! logServiceValue) {
    logServiceValue = path.join(
      irvingRoot,
      'services/logService/index.js'
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
