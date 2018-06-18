import queryString from 'query-string';
import { CONTEXT_PAGE } from 'config/constants';

/**
 * Fetch components for the page from the API.
 * @param {string} path - path of the request page
 * @param {string} context - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{components: object[], notFound: boolean}>}
 */
export default async function fetchComponents(path, context = CONTEXT_PAGE) {
  const query = queryString.stringify({ path, context });
  const url = `${process.env.API_ROOT_URL}/components?${query}`;
  const response = await fetch(url);
  const data = await response.json();

  if (500 >= response.status) {
    throw new Error(`API error: ${data.message}`);
  }

  return { components: data, notFound: 404 === response.status };
}
