import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';

/**
 * Fetch components for the page from the API.
 * @param {string} path - path of the request page
 * @param {string} context - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>}
 */
export default async function fetchComponents(path, context = CONTEXT_PAGE) {
  const query = queryString.stringify({ path, context });
  const url = `${process.env.API_ROOT_URL}/components?${query}`;
  const response = await fetch(url);
  const data = await response.json();
  const notFound = response.status;

  if (! response.ok && ! notFound) {
    throw new Error(`API error: ${data.message}`);
  }

  return { ...data, notFound };
}
