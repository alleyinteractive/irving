const getConfigField = require('./getConfigField');

/**
 * Call all getters and spread into an object.
 *
 * @param {string} key config key to get and from which to derive final value.
 * @param {object} initial initial value for reducer.
 * @returns {object}
 */
const getConfigObject = (key, initial = {}) => {
  const getters = getConfigField(key);

  return getters.reduce(
    (acc, getter) => {
      const configObject = 'function' === typeof getter ? getter(acc) : getter;
      return { ...acc, ...configObject };
    },
    initial
  );
};

/**
 * Call all getters and spread into an array.
 *
 * @param {string} key config key to get and from which to derive final value.
 * @param {array} initial initial value for reducer.
 * @returns {array}
 */
const getConfigArray = (key, initial = []) => {
  const getters = getConfigField(key);

  return getters.reduce(
    (acc, getter) => {
      const configArray = 'function' === typeof getter ? getter(acc) : getter;
      return [...acc, ...configArray];
    },
    initial
  );
};

module.exports = {
  getConfigObject,
  getConfigArray,
};
