import AbortController from 'abort-controller';
import omit from 'lodash/fp/omit';
import isNode from 'utils/isNode';
import createRouteLogTags from 'utils/createRouteLogTags';
import { maybeMergeAuthHeaders } from 'utils/authorization';
import { getEnv } from 'config/multisite';
import getLogService from '@irvingjs/services/logService';
import getCacheService from '@irvingjs/services/cacheService';
import createEndpointUrl from 'utils/endpoint/createEndpointUrl';

const log = getLogService('irving:components');

/**
 * Fetch components for the page from the API.
 *
 * @param {object} routeMeta metadata for current route.
 * @param {object} routeCookies allowlist of cookies for passing to in request endpoint.
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(routeMeta, routeCookies) {
  const {
    cookie,
    hostname,
  } = routeMeta;
  const env = getEnv(hostname);
  const { FETCH_TIMEOUT, API_ROOT_URL } = env;
  const apiUrl = createEndpointUrl(routeMeta, routeCookies);

  console.log(apiUrl);


  /**
   * If for some reason the API_ROOT_URL is not defined or a user/bot finds
   * an URL that is not mapped to a site on the network, return early
   * and avoid making an invalid fetch request ex:(https://undefined/foo/bar).
   */
  if (!API_ROOT_URL) {
    return {
      apiValid: false,
      defaults: [],
      page: [],
      providers: [],
      status: 404,
    };
  }

  // Create abort controller and set timeout to abort fetch call.
  // Default timeout is 10s, but can be configured with env var.
  const controller = new AbortController();
  const timeout = setTimeout(
    () => {
      log.error(
        new Error('Components: Components Endpoint fetch was aborted for taking too long. Increase the `FETCH_TIMEOUT` environment variable.'), // eslint-disable-line max-len
        {
          tags: createRouteLogTags(routeMeta, env),
        },
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
    const apiError = new Error(`API error: ${error}`);
    log.error(apiError, {
      tags: createRouteLogTags(routeMeta, env),
    });
    throw apiError;
  }

  const {
    redirectTo,
    redirectStatus,
  } = data;

  if (isNode() && redirectTo) {
    // Execute request without automatic redirect resolution, so we can
    // intercept and cascade the redirect down to the client.
    return {
      apiValid: true,
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
    const apiError = new Error(`API error: ${message}`);
    log.error(apiError, {
      tags: createRouteLogTags(routeMeta, env),
    });
    throw apiError;
  }

  return {
    ...data,
    apiValid: true,
    status: response.status,
    redirectTo,
  };
}

/**
 * Cache fetchComponents responses. Return cached response if available.
 *
 * @param {object} routeMeta metadata for current route.
 * @param {object} routeCookies allowlist of cookies for passing to in request endpoint.
 * @returns {Promise<{object}>} - fetchComponents return value
 */
async function cachedFetchComponents(routeMeta, routeCookies) {
  const cache = getCacheService();
  const apiUrl = createEndpointUrl(routeMeta, routeCookies);
  const key = `components-endpoint:${apiUrl}`;
  const info = {
    cached: false,
    __caching__: false,
    endpoint: apiUrl,
    cacheKey: key,
    updated: null,
  };
  const { cookie: { bypassCache } = {} } = routeMeta;

  if (bypassCache || !cache.client) {
    log.info('%o', info);
    return fetchComponents(routeMeta, routeCookies);
  }

  const cachedResult = await cache.cached(
    key,
    await fetchComponents(routeMeta, routeCookies),
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
