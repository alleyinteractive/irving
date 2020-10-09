const path = require('path');
const { buildContext } = require('../paths');
const { maybeResolve } = require('../../utils/userModule');
const resolvePackageConfigs = require('./resolvePackageConfigs');
/**
 * Resolve a filepath for a single config file.
 * Note: This will not return an array of all config files found, only the first one found.
 *
 * @param {string} configPath Path to config file we're looking for.
 * @returns {?string} The most recent filepath discovered (user's path overtakes all others).
 */
const resolveConfigFilepath = (configPath) => {
  // Get config paths.
  const packageConfigPaths = resolvePackageConfigs(
    configPath,
    { base: buildContext }
  );
  const userConfigPath = path.join(buildContext, configPath);
  const configs = packageConfigPaths.concat(userConfigPath);

  if (configs.length) {
    // Start from the user's config, as it should take precedence.
    const configArray = configs.reverse();

    for (let i = 0; i < configs.length; i += 1) {
      const resolvedPath = maybeResolve(configArray[i]);

      if (resolvedPath) {
        return resolvedPath;
      }
    }
  }

  return null;
};

module.exports = resolveConfigFilepath;
