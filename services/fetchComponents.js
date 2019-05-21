import { URL } from 'whatwg-url';
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
export async function fetchComponents(path, search, context = CONTEXT_PAGE) {
  const query = queryString.stringify({
    path,
    context,
    ...getExtraQueryParams(),
    ...queryString.parse(search),
  });
  const apiUrl = `${process.env.API_ROOT_URL}/components?${query}`;
  const options = {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include', // Support XHR with basic auth.
  };

  let response;
  let redirectTo = false;

  if (isNode()) {
    // Execute request without automatic redirect resolution, so we can
    // intercept and cascade the redirect down to the client.
    response = await fetch(apiUrl, { ...options, redirect: 'manual' });
    // node-fetch does not have response.redirected support
    const redirected = 300 <= response.status && 400 > response.status;
    if (redirected) {
      return {
        defaults: [],
        page: [],
        providers: [],
        status: response.status,
        redirectTo: getPath(response.headers.get('location')),
      };
    }
  } else {
    response = await fetch(apiUrl, options);
    // If executing in the browser, let the browser follow redirects.
    if (response.redirected) {
      // Keep track of the new path, so we can update the address bar state.
      redirectTo = getPath(response.url);
    }
  }

  const data = await response.json();
  // Abort if error is encountered, except 404s, which we will handle ourselves.
  if (! response.ok && 404 !== response.status) {
    throw new Error(`API error: ${data.message}`);
  }

  return {
    ...data,
    status: response.status,
    redirectTo,
  };
}

/**
 * Extract the path from a components api url.
 * @param {string} apiUrl - components api url
 * @returns {string} - The path param of the api url.
 */
function getPath(apiUrl) {
  const urlObj = new URL(apiUrl);
  return urlObj.searchParams.get('path');
}

/**
 * Cache fetchComponents responses. Return cached response if available.
 * @param {array} args - fetchComponents arguments
 * @returns {Promise<{object}>} - fetchComponents return value
 */
export default async function cacheResult(...args) {
  const cache = getService();
  const key = args.toString();
  const info = { cached: false, route: args };

  let response = await cache.get(key);
  if (! response) {
    debug(info);
    response = await fetchComponents(...args);
    await cache.set(key, response);
  } else {
    debug({ ...info, cached: true });
  }

  return response;
}
