const mergeWith = require('lodash/mergeWith');
const getConfigField = require('./getConfigField');

/**
 * Check if a config value is a function or raw value.
 *
 * @param {array|function} config Config to check.
 * @param {array|object} currentVal Current value to pass to config if it's a function.
 * @returns {array|object}
 */
const getConfigValue = (config, currentVal = null) => (
  'function' === typeof config ? config(currentVal) : config
);

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
 * @param {object} initial initial value for reducer.
 * @returns {object}
 */
module.exports.getMergedConfigObject = (configs, initial = {}) => {
  const configsToMerge = resolveConfigArray(configs);

  if (! configsToMerge) {
    return false;
  }

  return configsToMerge.reduce(
    (acc, config) => {
      if (! config) {
        return acc;
      }

      return mergeWith(
        acc,
        getConfigValue(config),
        (objValue, srcValue) => {
          if (Array.isArray(objValue)) {
            return objValue.concat(srcValue);
          }

          return undefined;
        }
      );
    },
    initial
  );
};

/**
 * Call all config functions and spread into an array.
 *
 * @param {array} configs Configs to merge.
 * @param {array} initial initial value for reducer.
 * @returns {array}
 */
module.exports.getMergedConfigArray = (configs, initial = []) => {
  const configsToMerge = resolveConfigArray(configs);

  if (! configsToMerge) {
    return false;
  }

  return configsToMerge.reduce(
    (acc, config) => {
      if (! config) {
        return acc;
      }

      return [
        ...acc,
        ...getConfigValue(config, acc),
      ];
    },
    initial
  );
};
