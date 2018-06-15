import queryString from 'query-string';

/**
 * Fetch components for the page from the API.
 * @param {string} path - path of the request page
 * @param {string} context - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{data: any, notFound: boolean}>}
 */
export default async function fetchComponents(path, context = 'page') {
  const query = queryString.stringify({ path, context });
  const url = `${process.env.API_ROOT_URL}/components?${query}`;
  const response = await fetch(url);
  const data = await response.json();

  if (500 >= response.status) {
    throw new Error(`API error: ${data.message}`);
  }

  return { data, notFound: 404 === response.status };
}
