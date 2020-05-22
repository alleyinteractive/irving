import getService from './cacheService';
import getLogService from './logService';

const log = getLogService('irving:components:data');

const fetchOpts = {
  headers: {
    Accept: 'application/json',
  },
};

export default async function fetchComponentData(endpoint) {
  // Fetch data for component.
  const response = await fetch(endpoint, fetchOpts);

  // Return data if invalid or redirected
  if (response.ok) {
    const data = await response.json();

    return data;
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return null;
};

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
    route: endpoint
  };

  let response = await cache.get(endpoint);
  if (!response) {
    log.info('%o', info);
    response = await fetchComponentData(endpoint);
    await cache.set(endpoint, response);
  } else {
    log.info('%o', {
      ...info,
      cached: true
    });
  }

  return response;
}
