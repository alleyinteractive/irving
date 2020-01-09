import queryString from 'query-string';
import AbortController from 'abort-controller';
import { CONTEXT_PAGE } from 'config/constants';
import isNode from 'utils/isNode';
import getService from './cacheService';
import getLogService from './logService';

const log = getLogService('irving:components');
// To access environment variables at run time in a client context we must
// access them through a global provided by the server render.
const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle

/**
 * Get any query parameters that should be included with every components request.
 *
 * @returns {object}
 */
function getExtraQueryParams() {
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
 * @param {string} cookie    - cookie header string
 * @param {string} [context] - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE
) {
  const query = queryString.stringify({
    path,
    context,
    ...getExtraQueryParams(),
    ...queryString.parse(search),
    ...cookie,
  });
  const apiUrl = `${process.env.API_ROOT_URL}/components?${query}`;

  // Create abort controller and set timeout to abort fetch call.
  // Default timeout is 10s, but can be configured with env var.
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    env.FETCH_TIMEOUT || 10000
  );

  // Set up fetch options.
  const options = {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include', // Support XHR with basic auth.
    signal: controller.signal,
  };
  const response = await fetch(apiUrl, options);

  // Clear timeout once response is returned (no matter what it is).
  clearTimeout(timeout);

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
  const key = args.map((arg) => {
    // Some args, like cookie, are objects—stringify those using query-string.
    if ('object' === typeof arg) {
      return queryString.stringify(arg);
    }

    return arg.toString();
  }).join(',');
  const info = { cached: false, route: args };

  let response = await cache.get(key);
  if (! response) {
    log.info('%o', info);
    response = await fetchComponents(...args);
    await cache.set(key, response);
  } else {
    log.info('%o', { ...info, cached: true });
  }

  return response;
}
