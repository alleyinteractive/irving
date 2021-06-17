const queryString = require('query-string');
const { getEnv } = require('../../config/multisite');
const { CONTEXT_PAGE } = require('../../config/constants');
const getExtraQueryParams = require('./getExtraQueryParams');
const validateEndpointUrl = require('./validateEndpointUrl');

/**
 * Creates the query string for both the components
 * API endpoint and to use as a cache key.
 *
 * @param {object} routeMeta metadata for current route.
 * @param {object} routeCookies allowlist of cookies for passing to in request endpoint.
 */
function createEndpointUrl(routeMeta, routeCookies) {
  const {
    hostname,
    path,
    search = '',
    context = CONTEXT_PAGE,
  } = routeMeta;
  const env = getEnv(hostname);
  const queryObject = { path };

  // Only include context param if it's provided, and make sure it appears after path.
  if (context) {
    queryObject.context = context;
  }

  const query = queryString.stringify(
    // Add remaining params inline.
    {
      ...queryObject,
      ...getExtraQueryParams(env),
      ...queryString.parse(search),
      ...routeCookies,
    },
    {
      encode: false,
      sort: false,
    },
  );

  const endPoint = validateEndpointUrl(env, `${env.API_ROOT_URL}/components?${query}`);

  return endPoint;
}

module.exports = createEndpointUrl;
