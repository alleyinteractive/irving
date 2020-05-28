import AbortController from 'abort-controller';
import getService from './cacheService';
import getLogService from './logService';

const log = getLogService('irving:components:data');

// To access environment variables at run time in a client context we must
// access them through a global provided by the server render.
const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle

export default async function fetchComponentData(endpoint) {
  // Create abort controller and set timeout to abort fetch call.
  // Default timeout is 10s, but can be configured with env var.
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    env.FETCH_TIMEOUT || 10000
  );

  // Fetch data for component.
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
    signal: controller.signal,
  });

  // Clear timeout once response is returned (no matter what it is).
  clearTimeout(timeout);

  // Return data if invalid or redirected.
  if (response.ok) {
    return response.json();
  }

  if (! response.ok) {
    throw new Error(await response.text());
  }

  return null;
}

/**
 * Cache fetchComponentData responses. Return cached response if available.
 *
 * @param {string} endpoint - fetchComponentData endpoint
 * @returns {Promise<{object}>} - fetchComponentData return value
 */
export async function cacheResult(endpoint) {
  const cache = getService();
  const info = {
    cached: false,
    __caching__: false,
    data: {},
    endpoint,
    updated: new Date(),
    cacheKey: endpoint,
  };

  // Check if we have a cache client set up.
  if (0 === Object.keys(cache.client).length) {
    const result = await fetchComponentData(endpoint);

    log.info('%o', {
      ...info,
      data: result,
    });

    return result;
  }

  const response = await cache.cached(
    endpoint,
    await fetchComponentData(endpoint),
    {
      payload: true,
    }
  );

  log.info('%o', {
    ...info,
    ...response,
    cached: true,
  });

  return response.data ? response.data : response;
}
