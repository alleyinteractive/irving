import AbortController from 'abort-controller';
import { CONTEXT_PAGE } from 'config/constants';
import isNode from 'utils/isNode';
import shouldAuthorize from 'utils/shouldAuthorize';
import getService from './cacheService';
import getLogService from './logService';
import createComponentsEndpointQueryString from
  './utils/createComponentsEndpointQueryString';

const log = getLogService('irving:components');
// To access environment variables at run time in a client context we must
// access them through a global provided by the server render.
const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle

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
  const query = createComponentsEndpointQueryString(
    path,
    search,
    cookie,
    context
  );
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

  // Set up Authorization header, if applicable.
  const authorizationBearerToken = shouldAuthorize(cookie);
  if (authorizationBearerToken) {
    // Set to same origin so we don't conflict with other cookies.
    options.credentials = 'same-origin';
    options.headers.Authorization = `Bearer ${authorizationBearerToken}`;
  }

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
 * @param {string} path      - path of the request page
 * @param {string} search    - search string
 * @param {string} cookie    - cookie header string
 * @param {string} [context] - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>} - fetchComponents return value
 */
async function cachedFetchComponents(
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE
) {
  const cache = getService();
  const componentsQuery = createComponentsEndpointQueryString(
    path,
    search,
    cookie,
    context
  );
  const key = `components-endpoint:${componentsQuery}`;
  const info = { cached: false, route: key };
  let response = await cache.get(key);
  const { bypassCache } = cookie;

  if (! response || bypassCache) {
    log.info('%o', info);
    response = await fetchComponents(path, search, cookie, context);
    await cache.set(key, response);
  } else {
    log.info('%o', { ...info, cached: true });
  }

  return response;
}

export default cachedFetchComponents;
