import AbortController from 'abort-controller';
import omit from 'lodash/fp/omit';
import {
  CONTEXT_PAGE,
} from 'config/constants';
import isNode from 'utils/isNode';
import shouldAuthorize from 'utils/shouldAuthorize';
import getEnv from 'utils/universalEnv';
import getLogService from '@irvingjs/services/logService';
import getCacheService from '@irvingjs/services/cacheService';
import createEndpointURL from 'utils/endpoint/createEndpointURL';

const log = getLogService('irving:components');

// To access environment variables at run time in a client context we must
// access them through a global provided by the server render.
const env = getEnv();

/**
 * Fetch components for the page from the API.
 *
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {object} cookie Cookie header string
 * @param {string} context "Page" (page specific components) or "site" (all components)
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(
  path,
  search = '',
  cookie = {},
  context = CONTEXT_PAGE
) {
  const apiUrl = createEndpointURL(
    path,
    search,
    cookie,
    context
  );

  // Create abort controller and set timeout to abort fetch call.
  // Default timeout is 10s, but can be configured with env var.
  const controller = new AbortController();
  const timeout = setTimeout(
    () => {
      log.error('Components: Components Endpoint fetch was aborted for taking too long. Increase the `FETCH_TIMEOUT` environment variable.'); // eslint-disable-line max-len
      controller.abort();
    },
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
  const {
    redirectTo,
    redirectStatus,
  } = data;

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
 *
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {object} cookie Cookie header string
 * @param {string} context "Page" (page specific components) or "site" (all components)
 * @returns {Promise<{object}>} - fetchComponents return value
 */
async function cachedFetchComponents(
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE
) {
  const cache = getCacheService();
  const apiUrl = createEndpointURL(
    path,
    search,
    cookie,
    context
  );
  const key = `components-endpoint:${apiUrl}`;
  const info = {
    cached: false,
    __caching__: false,
    endpoint: apiUrl,
    cacheKey: key,
    updated: null,
  };
  const {
    bypassCache,
  } = cookie;

  if (bypassCache || ! cache.client) {
    log.info('%o', info);
    return fetchComponents(path, search, cookie, context);
  }

  const cachedResult = await cache.cached(
    key,
    await fetchComponents(path, search, cookie, context),
    {
      payload: true,
    }
  );

  log.info('%o', {
    ...info,
    ...omit('data', cachedResult),
    cached: true,
  });

  return cachedResult.data ? cachedResult.data : cachedResult;
}

export default cachedFetchComponents;
