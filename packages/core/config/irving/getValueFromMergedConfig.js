/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const memoize = require('lodash/memoize');
const { getConfigValue } = require('./getConfigValue');
let userConfig = {};

if (
  process.env.IRVING_EXECUTION_CONTEXT ||
  'test' === process.env.BABEL_ENV
) {
  userConfig = require('@irvingjs/irving.config').default || {};
} else {
  const { buildContext } = require('./paths');
  const path = require('path');
  const fs = require('fs');
  const configPath = path.resolve(buildContext, 'irving.config.js');

  // Resolve file relative to build context if it exists.
  if (fs.existsSync(configPath)) {
    userConfig = require(configPath);
  }
}

/**
 * Get a single value from the user config.
 *
 * @param {string} key key to search for in config.
 * @param {mixed} defaultValue Default value to merge found configs with.
 * @returns {mixed}
 */
const getValueFromUserConfig = (key, defaultValue) => {
  if (userConfig[key]) {
    return userConfig[key];
  }

  return defaultValue;
};

/**
 * Get merged value from user's irving.config.js file (including configured packages).
 *
 * @param {string} key key to search for in config.
 * @param {mixed} defaultValue Default value to merge found configs with.
 * @returns {mixed}
 */
const getValueFromMergedConfig = memoize((key, defaultValue) => {
  let { packages = [] } = userConfig;

  // User empty array or user configured pacakges.
  if (userConfig.packages && userConfig.packages.length) {
    packages = userConfig.packages;
  }

  const configValues = [...packages, userConfig].map((config) => {
    if (config[key]) {
      return config[key];
    }

    return null;
  }).filter((value) => !! value);

  return getConfigValue(configValues, defaultValue);
});

module.exports = {
  getValueFromUserConfig,
  getValueFromMergedConfig,
};
