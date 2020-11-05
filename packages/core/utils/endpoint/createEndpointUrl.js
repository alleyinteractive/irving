import omit from 'lodash/fp/omit';
import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import getEnv from 'utils/universalEnv';
import defaultCookies from 'config/defaultCookies';
import getExtraQueryParams from './getExtraQueryParams';

const env = getEnv();

/**
 * Creates the query string for both the components
 * API endpoint and to use as a cache key.
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {string} cookie Cookie header string
 * @param {string} [context] "Page" (page specific components) or "site" (all components)
 */
function createEndpointUrl(
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE
) {
  const queryObject = { path };

  // Only include context param if it's provided, and make sure it appears after path.
  if (context) {
    queryObject.context = context;
  }

  const query = queryString.stringify(
    // Add remaining params inline.
    {
      ...queryObject,
      ...getExtraQueryParams(),
      ...queryString.parse(search),
      ...omit(defaultCookies, cookie),
    },
    {
      encode: false,
      sort: false,
    }
  );

  return `${env.API_ROOT_URL}/components?${query}`;
}

export default createEndpointUrl;
