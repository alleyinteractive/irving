const omit = require('lodash/fp/omit');
const queryString = require('query-string');
const { getEnv } = require('../../config/multisite');
const { CONTEXT_PAGE } = require('../../config/constants');
const defaultCookies = require('../../config/defaultCookies');
const getExtraQueryParams = require('./getExtraQueryParams');

/**
 * Creates the query string for both the components
 * API endpoint and to use as a cache key.
 *
 * @param {string} hostname Current hostname.
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {string} cookie Cookie header string
 * @param {string} [context] "Page" (page specific components) or "site" (all components)
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

  return `${env.API_ROOT_URL}/components?${query}`;
}

module.exports = createEndpointUrl;
