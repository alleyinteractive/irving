const mergeWith = require('lodash/mergeWith');
const isPlainObject = require('lodash/isPlainObject');

/**
 * Call all config functions and spread configs into an object.
 *
 * @param {array} configs Configs to merge.
 * @param {object} initial initial value.
 * @returns {object}
 */
const getMergedConfigObject = (configs, initial = {}) => (
  configs.reduce(
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
  )
);

/**
 * Call all config functions and spread into an array.
 *
 * @param {array} configs Configs to merge.
 * @param {array} initial initial value.
 * @returns {array}
 */
const getMergedConfigArray = (configs, initial = []) => (
  configs.reduce(
    (acc, config) => {
      if (! config) {
        return acc;
      }

      if ('function' === typeof config) {
        return config(acc);
      }

      return [...acc, ...config];
    },
    initial
  )
);

/**
 * Determine which merge strategy to use based on a default value.
 *
 * @param {array} configs Configs to merge.
 * @param {array} initial initial value.
 * @returns {array}
 */
const getConfigValue = (configs, initial) => {
  if (Array.isArray(initial)) {
    // This should result in an array of functions, to be called inline.
    if (initial.length && 'function' === typeof initial[0]) {
      return configs.reduce((acc, config) => acc.concat(config), initial);
    }

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
  getConfigValue,
};
