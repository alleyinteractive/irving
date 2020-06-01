/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const memoize = require('lodash/memoize');
const { nodeRequire } = require('../utils/nodeRequire');
const { getConfigValue } = require('./getConfigValue');
const { buildContext } = require('./paths');
const packagejson = path.join(buildContext, 'package.json');

/**
 * Resolve the path to a config file.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 */
const maybeRequireConfigFile = (
  filepath,
  base,
) => {
  const resolvedPath = path.resolve(path.resolve(base, filepath));

  // If file exists in build context, assume the same file exists in the appRoot.
  // This will support app finding appropriate file if build happens in a different place than app execution.
  if (fs.existsSync(resolvedPath)) {
    return nodeRequire(resolvedPath);
  }

  return null;
};

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 */
const getPackageConfigs = (filepath, base) => {
  // Search for package versions of this file.
  const packageData = fs.readFileSync(packagejson, 'utf8');
  const userPackage = JSON.parse(packageData);
  const irvingDeps = Object.keys(userPackage.dependencies)
    .filter((dep) => dep.includes('@irvingjs'));
  return irvingDeps.map((dep) => {
    // Ignore deps in irving core to prevent infinite loops.
    if ('@irvingjs/core' === dep) {
      return null;
    }

    const configFile = maybeRequireConfigFile(
      path.join('node_modules', dep, filepath),
      base,
    );

    return configFile;
  }).filter((config) => !! config);
};

/**
 * Resolve config files and return them as an array of `require`d modules.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 * @param {bool} isSingleFunction Is this config a single function?
 * @param {bool} require Should the files be required, or just resolved?
 */
const getConfigModules = (
  filepath,
  base,
  isSingleFunction = false,
) => {
  const userConfig = maybeRequireConfigFile(filepath, base);

  // If we're only looking for a single file,
  // rely on the user's version of it first if it exists.
  if (userConfig && isSingleFunction) {
    return userConfig;
  }

  const configs = getPackageConfigs(filepath, base);

  // Return the final config file found if we're looking for a singular file.
  // @todo figure out a better way to control which is used.
  const lastConfig = configs[configs.length - 1];
  if (lastConfig && isSingleFunction) {
    return lastConfig;
  }

  // Add on user config and filter if it was found.
  if (userConfig) {
    configs.push(userConfig);
  }

  return configs;
};

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 * @param {array|object} defaultValue Default value to merge found configs with.
 */
const getConfigFromFiles = memoize((
  filepath,
  base,
  defaultValue,
) => {
  // We need a default in order to know what to return.
  if (! defaultValue) {
    return null;
  }

  const isSingleFunction = 'function' === typeof defaultValue;
  const configs = getConfigModules(filepath, base, isSingleFunction);

  // Return any single-fuction config results as-is.
  if (isSingleFunction) {
    if ('function' === typeof configs) {
      return configs;
    }

    return defaultValue;
  }

  // Merge arrays if config default is an array, otherwise merge objects.
  return getConfigValue(configs, defaultValue);
});

module.exports = {
  getConfigFromFiles,
  getConfigModules,
};
