/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const memoize = require('lodash/memoize');
const { appRoot } = require('../paths');
const { mergeConfigValues } = require('./mergeConfigValues');
const requireConfigModules = require('./requireConfigModules');

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {array|object} defaultValue Default value to merge found configs with.
 * @param {object} opts Options for finding config files.
 * @param {string} opts.base Base filepath to look for config files in.
 * @param {array}  opts.ignorePackages Array of packages to ignore when looking for files.
 */
const getValueFromFiles = (
  filepath,
  defaultValue,
  opts = {}
) => {
  const normalizedOpts = {
    base: appRoot,
    ignorePackages: [],
    ...opts,
  };
  const isSingleFunction = 'function' === typeof defaultValue;
  const configs = requireConfigModules(filepath, normalizedOpts);

  // Return any single-function config results as-is.
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
  return mergeConfigValues(configs, defaultValue);
};

const getValueFromFilesMemo = memoize(getValueFromFiles);

// Export non-memoized version as well (named export).
getValueFromFilesMemo.getValueFromFiles = getValueFromFiles;
module.exports = getValueFromFilesMemo;
