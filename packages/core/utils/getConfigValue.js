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

  return getters.reduce((acc, getter) => (
    { ...acc, ...getter(acc) }
  ), initial);
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

  return getters.reduce((acc, getter) => (
    [...acc, ...getter(acc)]
  ), initial);
};

module.exports = {
  getConfigObject,
  getConfigArray,
};
