import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import getCache from './cacheService';

/**
 * Fetch components for the page from the API.
 * @param {string} path - path of the request page
 * @param {string} context - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(path, context = CONTEXT_PAGE) {
  const query = queryString.stringify({ path, context });
  const url = `${process.env.API_ROOT_URL}/components?${query}`;
  const options = {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include', // Support XHR with basic auth.
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const notFound = 404 === response.status;

  if (! response.ok && ! notFound) {
    throw new Error(`API error: ${data.message}`);
  }

  return { ...data, notFound };
}

/**
 * Cache fetchComponents responses. Return cached response if available.
 * @param {array} args - fetchComponents arguments
 * @returns {Promise<{object}>} - fetchComponents return value
 */
export default async function cacheResult(...args) {
  const cache = getCache();
  const key = args.toString();
  let response = await cache.get(key);
  if (! response) {
    response = await fetchComponents(...args);
    await cache.set(key, response);
  }

  return response;
}
