import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';
import isNode from 'utils/isNode';
import getCache from './cacheService';

const defaultConfig = {
  // When a request is being handled on the server we need to analyze the status
  // code so we can pass it down. This requires grabbing the status, and then
  // manually continuing the redirect process. If we are in the client, we can
  // let the browser handle the redirects.
  redirect: isNode() ? 'manual' : 'follow',
};

/**
 *
 * @param {object} response
 * @param {number} redirects
 * @returns {Promise<{object}>}
 */
async function handleRedirects(response, redirects = 1) {
  const isRedirect = 300 <= response.status && 400 > response.status;
  if (! isRedirect) {
    return response;
  }

  const maxRedirects = 5;
  if (redirects > maxRedirects) {
    throw new Error(
      `API error: Max number of redirects reached. ${response.url}`
    );
  }

  const newUrl = response.headers.get('location');
  return handleRedirects(await fetch(newUrl, defaultConfig), redirects + 1);
}

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
  const initialResponse = await fetch(url, defaultConfig);
  const { status } = initialResponse;
  const response = await handleRedirects(initialResponse);
  const data = await response.json();
  const notFound = 404 === status;

  if (! response.ok && ! notFound) {
    throw new Error(`API error: ${data.message}`);
  }

  return {
    ...data,
    status,
    url: response.url,
  };
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
