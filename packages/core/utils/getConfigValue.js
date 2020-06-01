const mergeWith = require('lodash/mergeWith');
const isPlainObject = require('lodash/isPlainObject');
const getConfigField = require('./getConfigField');

/**
 * Get or return values (if it's already an array).
 *
 * @param {array|string} values Config to check.
 * @returns {array}
 */
const resolveConfigArray = (values) => {
  if (Array.isArray(values)) {
    return values;
  }

  if ('string' === typeof values) {
    return getConfigField(values);
  }

  return false;
};

/**
 * Call all config functions and spread configs into an object.
 *
 * @param {array} configs Configs to merge.
 * @param {object} initial initial value.
 * @returns {object}
 */
const getMergedConfigObject = (configs, initial = {}) => {
  const configsToMerge = resolveConfigArray(configs);

  if (! configsToMerge) {
    return false;
  }

  return configsToMerge.reduce(
    (acc, config) => {
      if (! config) {
        return acc;
      }

      if ('function' === typeof config) {
        return config(acc);
      }

      return mergeWith(acc, config, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return objValue.concat(srcValue);
        }

        return undefined;
      });
    },
    initial
  );
};

/**
 * Call all config functions and spread into an array.
 *
 * @param {array} configs Configs to merge.
 * @param {array} initial initial value.
 * @returns {array}
 */
const getMergedConfigArray = (configs, initial = []) => {
  const configsToMerge = resolveConfigArray(configs);

  if (! configsToMerge) {
    return false;
  }

  return configsToMerge.reduce(
    (acc, config) => {
      if (! config) {
        return acc;
      }

      if ('function' === typeof config) {
        return config(acc);
      }

      return acc.concat(config);
    },
    initial
  );
};

/**
 * Determine which merge strategy to use based on a default value.
 *
 * @param {array} configs Configs to merge.
 * @param {array} initial initial value.
 * @returns {array}
 */
const getMergedConfig = (configs, initial) => {
  if (Array.isArray(initial)) {
    return getMergedConfigArray(configs, initial);
  }

  if (isPlainObject(initial)) {
    return getMergedConfigObject(configs, initial);
  }

  return initial;
};

module.exports = {
  getMergedConfigArray,
  getMergedConfigObject,
  getMergedConfig,
};
