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
  const response = await fetch(apiUrl, { ...options });
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
