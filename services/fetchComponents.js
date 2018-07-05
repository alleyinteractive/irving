import { URL } from 'whatwg-url';
import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import isNode from 'utils/isNode';
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
  const apiUrl = `${process.env.API_ROOT_URL}/components?${query}`;
  let response;
  let redirectTo = false;

  if (isNode()) {
    // Execute request without automatic redirect resolution, so we can
    // intercept and cascade the redirect down to the client.
    response = await fetch(apiUrl, { redirect: 'manual' });
    // node-fetch does have response.redirected support
    const redirected = 300 <= response.status && 400 > response.status;
    if (redirected) {
      return {
        defaults: [],
        page: [],
        status: response.status,
        redirectTo: getPath(response.headers.get('location')),
      };
    }
  } else {
    response = await fetch(apiUrl);
    // If executing in the browser, let request redirects follow through.
    if (response.redirected) {
      // keep track of the new path, so we can update the address bar.
      redirectTo = getPath(response.url);
    }
  }

  const data = await response.json();
  if (! response.ok && 404 !== response.status) {
    throw new Error(`API error: ${data.message}`);
  }

  return {
    ...data,
    status: response.status,
    // Note the updated url path if a redirect occurred.
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
  const cache = getCache();
  const key = args.toString();
  let response = await cache.get(key);
  if (! response) {
    response = await fetchComponents(...args);
    await cache.set(key, response);
  }

  return response;
}
