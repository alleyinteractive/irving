const fs = require('fs');
const path = require('path');
const { buildContext, irvingRoot } = require('./paths');
const resolvePackageConfigs = require('./resolvePackageConfigs');

/**
 * Keys are config search paths and values are default filepaths in core.
 */
const configPaths = {
  'services/cacheClient': path.join(
    irvingRoot,
    'services/cacheService/getClient.js'
  ),
  'services/cacheService': path.join(
    irvingRoot,
    'services/cacheService/index.js'
  ),
  'services/logService': path.join(
    irvingRoot,
    'services/logService/index.js'
  ),
  'services/monitorService': path.join(
    irvingRoot,
    'services/monitorService/index.js'
  ),
};

const createAliasObject = (configPath, filepath) => (
  { [`@irvingjs/${configPath}`]: filepath }
);

/**
 * Convert config paths into aliases.
 *
 * @param {string} configPath Path to config file we're looking for.
 */
const getConfigFileAlias = (configPath) => {

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
        return createAliasObject(configPath, fileWithExtension);
      }
    }
  }

  return null;
};

/**
 * Convert config paths into aliases.
 *
 * @param {string} configPath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 */
const getConfigFileAliases = () => {
  return Object.keys(configPaths)
    .reduce((acc, configPath) => {
      const alias = getConfigFileAlias(configPath) ||
        createAliasObject(configPath, configPaths[configPath]);
      return { ...acc, ...alias };
    }, {});
};

module.exports = getConfigFileAliases;
