/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const memoize = require('lodash/memoize');
const { mergeConfigValues } = require('./mergeConfigValues');
const userConfig = require('@irvingjs/irving.config').default || {};

/**
 * Get a single value from the user config.
 *
 * @param {string} key Key to search for in config.
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
 * Get merged configs
 *
 * @param {string} key Config Key
 * @returns {array} Config values
 */
const getConfigValues = (key) => {
  let { packages = [] } = userConfig;

  // User empty array or user configured pacakges.
  if (userConfig.packages && userConfig.packages.length) {
    packages = userConfig.packages;
  }

  return [...packages, userConfig].map((config) => {
    console.log(config, key);
    if (config[key]) {
      return config[key];
    }

    return null;
  }).filter((value) => !! value);
};

/**
 * Get merged value from user's irving.config.js file (including configured packages).
 *
 * @param {string} key Key to search for in config.
 * @param {mixed} defaultValue Default value to merge found configs with.
 * @returns {mixed}
 */
const getValueFromConfig = (key, defaultValue) => {
  const configValues = getConfigValues(key);
  return mergeConfigValues(configValues, defaultValue);
};

module.exports = {
  getValueFromUserConfig,
  getConfigValues,
  getValueFromConfigNoMemo: getValueFromConfig,
  getValueFromConfig: memoize(getValueFromConfig),
};
