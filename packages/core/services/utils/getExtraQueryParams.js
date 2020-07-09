import getEnvIsomorphic from 'utils/getEnvIsomorphic';

// To access environment variables at run time in a client context we must
// access them through a global provided by the server render.
const env = getEnvIsomorphic(); // eslint-disable-line no-underscore-dangle

/**
 * Get any query parameters that should be included with every components request.
 *
 * @returns {object}
 */
const getExtraQueryParams = () => Object
  .keys(env)
  .filter((key) => 0 === key.indexOf('API_QUERY_PARAM_'))
  .reduce((acc, key) => {
    const param = key.replace('API_QUERY_PARAM_', '').toLowerCase();
    return {
      ...acc,
      [param]: env[key],
    };
  }, {});

module.exports = getExtraQueryParams;
