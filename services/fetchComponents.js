/* eslint-disable */
import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import isNode from 'utils/isNode';
import getService from './cacheService';
import createDebug from './createDebug';

const debug = createDebug('components');

/**
 * Get any query parameters that should be included with every components request.
 *
 * @returns {object}
 */
function getExtraQueryParams() {
  // To access environment variables at run time in a client context we must
  // access them through a global provided by the server render.
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
  return Object
    .keys(env)
    .filter((key) => 0 === key.indexOf('API_QUERY_PARAM_'))
    .reduce((acc, key) => {
      const param = key.replace('API_QUERY_PARAM_', '').toLowerCase();
      return {
        ...acc,
        [param]: env[key],
      };
    }, {});
}

/**
 * Fetch components for the page from the API.
 * @param {string} path      - path of the request page
 * @param {string} search    - search string
 * @param {string} [context] - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(
  path,
  search,
  context = CONTEXT_PAGE,
  cookie
) {
  const query = queryString.stringify({
    path,
    context,
    ...getExtraQueryParams(),
    ...queryString.parse(search),
  },
  {
    encode: false,
  });

  const apiUrl = `${process.env.API_ROOT_URL}/components?${query}`;
  const options = {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include', // Support XHR with basic auth.
  };

  if (cookie.authorizationBearerToken) {
    options.headers.Authorization = `Bearer ${cookie.authorizationBearerToken}`;
  }

  const response = await fetch(apiUrl, { ...options });
  console.log(apiUrl, options);
  const data = await response.json();
  const { redirectTo, redirectStatus } = data;

  if (isNode() && redirectTo) {
    // Execute request without automatic redirect resolution, so we can
    // intercept and cascade the redirect down to the client.
    return {
      defaults: [],
      page: [],
      providers: [],
      status: response.status,
      redirectTo,
      redirectStatus,
    };
  }

  // Abort if error is encountered, except 404s, which we will handle ourselves.
  if (
    ! response.ok &&
    ! redirectTo &&
    404 !== response.status
  ) {
    throw new Error(`API error: ${data.message}`);
  }

  return {
    ...data,
    status: response.status,
    redirectTo,
  };
}

/**
 * Cache fetchComponents responses. Return cached response if available.
 * @param {string} path      - path of the request page
 * @param {string} search    - search string
 * @param {string} cookie    - cookie header string
 * @param {string} [context] - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>} - fetchComponents return value
 */
export default async function cacheResult(
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE
) {
  const cache = getService();
  const args = [
    path,
    search,
    cookie,
    context,
  ];
  console.log('cookie: ', cookie);
  const key = args.map((arg) => {
    if ('undefined' === typeof arg) {
      return '';
    }

    // Some args, like cookie, are objects—stringify those using query-string.
    if ('object' === typeof arg) {
      return queryString.stringify(arg);
    }

    return arg.toString();
  }).join(',');
  const info = { cached: false, route: args };
  let response = await cache.get(key);
  const {
    bypassCache,
  } = cookie;

  if (! response || bypassCache) {
    debug(info);
    response = await fetchComponents(path, search, context, cookie);
    await cache.set(key, response);
  } else {
    debug({ ...info, cached: true });
  }

  return response;
}
