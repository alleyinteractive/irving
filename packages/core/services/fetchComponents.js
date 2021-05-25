import AbortController from 'abort-controller';
import omit from 'lodash/fp/omit';
import {
  CONTEXT_PAGE,
} from 'config/constants';
import isNode from 'utils/isNode';
import { maybeMergeAuthHeaders } from 'utils/authorization';
import { getEnv } from 'config/multisite';
import getLogService from '@irvingjs/services/logService';
import getCacheService from '@irvingjs/services/cacheService';
import createEndpointUrl from 'utils/endpoint/createEndpointUrl';

const log = getLogService('irving:components');

/**
 * Fetch components for the page from the API.
 *
 * @param {string} hostname Hostname for current site
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {object} cookie Cookie header string
 * @param {string} context "Page" (page specific components) or "site" (all components)
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(
  hostname,
  path,
  search = '',
  cookie = {},
  context = CONTEXT_PAGE,
) {
  const { FETCH_TIMEOUT, ROOT_URL } = getEnv(hostname);
  const apiUrl = createEndpointUrl(
    hostname,
    path,
    search,
    cookie,
    context,
  );

  // Create abort controller and set timeout to abort fetch call.
  // Default timeout is 10s, but can be configured with env var.
  const controller = new AbortController();
  const timeout = setTimeout(
    () => {
      log.error(
        new Error('Components: Components Endpoint fetch was aborted for taking too long. Increase the `FETCH_TIMEOUT` environment variable.'), // eslint-disable-line max-len
        { errorUrl: ROOT_URL + path + search },
      );
      controller.abort();
    },
    FETCH_TIMEOUT || 10000,
  );

  // Set up fetch options, including authorization header if applicable.
  const options = maybeMergeAuthHeaders(cookie, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include', // Support XHR with basic auth.
    signal: controller.signal,
  });

  const response = await fetch(apiUrl, options);

  // Clear timeout once response is returned (no matter what it is).
  clearTimeout(timeout);

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`API error: ${error}`);
  }

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
    !response.ok
    && !redirectTo
    && response.status !== 404
  ) {
    const message = data.message || data.data || 'No error returned by API';
    throw new Error(`API error: ${message}`);
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
 * @param {string} hostname Hostname for current site
 * @param {string} path Path of the request page
 * @param {string} search Search string
 * @param {object} cookie Cookie header string
 * @param {string} context "Page" (page specific components) or "site" (all components)
 * @returns {Promise<{object}>} - fetchComponents return value
 */
async function cachedFetchComponents(
  hostname,
  path,
  search,
  cookie = {},
  context = CONTEXT_PAGE,
) {
  const cache = getCacheService();
  const apiUrl = createEndpointUrl(
    hostname,
    path,
    search,
    cookie,
    context,
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

  if (bypassCache || !cache.client) {
    log.info('%o', info);
    return fetchComponents(hostname, path, search, cookie, context);
  }

  const cachedResult = await cache.cached(
    key,
    await fetchComponents(hostname, path, search, cookie, context),
    {
      payload: true,
    },
  );

  log.info('%o', {
    ...info,
    ...omit('data', cachedResult),
    cached: true,
  });

  return cachedResult.data ? cachedResult.data : cachedResult;
}

export default cachedFetchComponents;
