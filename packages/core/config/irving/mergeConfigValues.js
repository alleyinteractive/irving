const mergeWith = require('lodash/mergeWith');
const isPlainObject = require('lodash/isPlainObject');

/**
 * Call all config functions and spread into an array.
 *
 * @param {array} configs Configs to merge.
 * @param {array} initial Initial value.
 * @param {?(array)} args Additional arguments to supply to config functions.
 * @returns {array}
 */
const mergeConfigArray = (configs, initial = [], args = []) => (
  configs.reduce(
    (acc, config) => {
      if (!config) {
        return acc;
      }

      if (typeof config === 'function') {
        return config(acc, ...args);
      }

      return acc.concat(config);
    },
    initial,
  )
);

/**
 * Call all config functions and spread configs into an object.
 *
 * @param {array} configs Configs to merge.
 * @param {object} initial Initial value.
 * @param {?(array)} args Additional arguments to supply to config functions.
 * @returns {object}
 */
const mergeConfigObject = (configs, initial = {}, args = []) => (
  configs.reduce(
    (acc, config) => {
      if (!config) {
        return acc;
      }

      if (typeof config === 'function') {
        return config(acc, ...args);
      }

      return mergeWith(acc, config, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return objValue.concat(srcValue);
        }

        return undefined;
      });
    },
    initial,
  )
);

/**
 * Determine which merge strategy to use based on a default value.
 *
 * @param {array} configs Configs to merge.
 * @param {?(array|object|string|bool)} initial Initial value.
 * @returns {?(array|object|string|bool}
 */
const mergeConfigValues = (configs, initial = null, args = []) => {
  if (Array.isArray(initial)) {
    // This should result in an array of functions, to be called inline.
    if (initial.length && typeof initial[0] === 'function') {
      return configs.reduce((acc, config) => acc.concat(config), initial);
    }

    return mergeConfigArray(configs, initial, args);
  }

  if (isPlainObject(initial)) {
    return mergeConfigObject(configs, initial, args);
  }

  return initial;
};

module.exports = {
  mergeConfigArray,
  mergeConfigObject,
  mergeConfigValues,
};
