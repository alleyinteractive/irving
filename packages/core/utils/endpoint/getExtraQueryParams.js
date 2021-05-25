/**
 * Get any query parameters that should be included with every components request.
 *
 * @param {object} env Current enviornmental variables.
 * @returns {object}
 */
const getExtraQueryParams = (env) => Object
  .keys(env)
  .filter((key) => key.indexOf('API_QUERY_PARAM_') === 0)
  .reduce((acc, key) => {
    const param = key.replace('API_QUERY_PARAM_', '').toLowerCase();
    return {
      ...acc,
      [param]: env[key],
    };
  }, {});

module.exports = getExtraQueryParams;
