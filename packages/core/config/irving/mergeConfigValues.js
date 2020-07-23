const mergeWith = require('lodash/mergeWith');
const isPlainObject = require('lodash/isPlainObject');

/**
 * Call all config functions and spread configs into an object.
 *
 * @param {array} configs Configs to merge.
 * @param {object} initial Initial value.
 * @returns {object}
 */
const mergeConfigObject = (configs, initial = {}) => (
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
 * @param {array} initial Initial value.
 * @returns {array}
 */
const mergeConfigArray = (configs, initial = []) => (
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
 * @param {?(array|object|string|bool)} initial Initial value.
 * @returns {?(array|object|string|bool}
 */
const mergeConfigValues = (configs, initial = null) => {
  if (Array.isArray(initial)) {
    // This should result in an array of functions, to be called inline.
    if (initial.length && 'function' === typeof initial[0]) {
      return configs.reduce((acc, config) => acc.concat(config), initial);
    }

    return mergeConfigArray(configs, initial);
  }

  if (isPlainObject(initial)) {
    return mergeConfigObject(configs, initial);
  }

  return initial;
};

module.exports = {
  mergeConfigArray,
  mergeConfigObject,
  mergeConfigValues,
};
