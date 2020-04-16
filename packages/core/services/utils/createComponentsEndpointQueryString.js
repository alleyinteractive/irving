import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import getExtraQueryParams from './getExtraQueryParams';

/**
 * Creates the query string for both the components
 * API endpoint and to use as a cache key.
 * @param {string} path      - path of the request page
 * @param {string} search    - search string
 * @param {string} cookie    - cookie header string
 * @param {string} [context] - "page" (page specific components) or
 *                           "site" (all components)
 */
function createComponentsEndpointQueryString(
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE
) {
  return queryString.stringify({
    path,
    context,
    ...getExtraQueryParams(),
    ...queryString.parse(search),
    ...cookie,
  },
  {
    encode: false,
    sort: false,
  });
}

export default createComponentsEndpointQueryString;
