/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const memoize = require('lodash/memoize');
const { getConfigValue } = require('./getConfigValue');
const requireConfigModules = require('./requireConfigModules');

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 * @param {array|object} defaultValue Default value to merge found configs with.
 */
const getConfigFromFiles = (
  filepath,
  base,
  defaultValue
) => {
  const isSingleFunction = 'function' === typeof defaultValue;
  const configs = requireConfigModules(filepath, base, isSingleFunction);

  // Return any single-fuction config results as-is.
  if (isSingleFunction) {
    // Return the final config file found if we're looking for a singular file.
    // @todo figure out a better way to control which is used.
    const lastConfig = configs[configs.length - 1];
    if (lastConfig && 'function' === typeof lastConfig) {
      return lastConfig;
    }

    return defaultValue;
  }

  // Merge arrays if config default is an array, otherwise merge objects.
  return getConfigValue(configs, defaultValue);
};

const getConfigFromFilesMemo = memoize(getConfigFromFiles);

// Export non-memoized version as well (named export).
getConfigFromFilesMemo.getConfigFromFiles = getConfigFromFiles;
module.exports = getConfigFromFilesMemo;
