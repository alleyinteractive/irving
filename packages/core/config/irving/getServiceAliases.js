const fs = require('fs');
const path = require('path');
const { buildContext, irvingRoot } = require('../paths');
const resolvePackageConfigs = require('./resolvePackageConfigs');

/**
 * Convert config paths into aliases.
 *
 * @param {string} configPath Path to config file we're looking for.
 */
const resolveConfigFilepath = (configPath) => {
  // Get config paths.
  const packageConfigPaths = resolvePackageConfigs(configPath, buildContext);
  const userConfigPath = path.join(buildContext, configPath);
  const configs = packageConfigPaths.concat(userConfigPath);

  if (configs.length) {
    // Start from the user's config, as it should take precedence.
    const configArray = configs.reverse();

    for (let i = 0; i < configs.length; i += 1) {
      const fileWithExtension = `${configArray[i]}.js`;

      if (fs.existsSync(fileWithExtension)) {
        return fileWithExtension;
      }
    }
  }

  return null;
};

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
      'services/cacheService/defaultCacheClient.js'
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
