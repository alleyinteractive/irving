import omit from 'lodash/fp/omit';
import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import defaultCookies from 'config/defaultCookies';
import getExtraQueryParams from './getExtraQueryParams';

/**
 * Creates the query string for both the components
 * API endpoint and to use as a cache key.
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {string} cookie Cookie header string
 * @param {string} [context] "Page" (page specific components) or "site" (all components)
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
    ...omit(defaultCookies, cookie),
  },
  {
    encode: false,
    sort: false,
  });
}

export default createComponentsEndpointQueryString;
