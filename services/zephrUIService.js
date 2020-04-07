import createDebug from './createDebug';
const debug = createDebug('zephr:UIComponents');

/**
 * Query the component endpoint through the Zephr CDN to add any transformed
 * components to the state.
 *
 * @param {string} pageID The post ID of the current page, if set.
 *
 * @returns {object|null} The API response if returned, or null.
 */
export async function fetchZephrUIComponents({ pageID, session }) {
  // Build the endpoint to fetch.
  const contentQuery = pageID ? `content_id=${pageID}` : '';
  const endpoint = `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents?${contentQuery}`; // eslint-disable-line max-len

  // Get the session cookie to add the header.
  const { sessionCookie: cookie = '' } = session || {};

  // Fetch data for component.
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      cookie,
    },
    credentials: 'include',
  });

  // Return data if invalid or redirected.
  if (response.ok) {
    const data = await response.json();

    return data;
  }

  if (! response.ok) {
    debug(await response.text());
    throw new Error(await response.text());
  }

  return null;
}

/**
 * Get the dataLayer object for the current session. All fields configured in
 * the admin console will be resolved against the current session and returned.
 *
 * @see https://s3.eu-west-2.amazonaws.com/live-site-api-docs/public-api-doc.html#web-analytics-get-datalayer-get
 *
 * @param {string} session The user's current active session cookie.
 *
 * @returns {object|null} The API response if returned, or null.
 */
export async function fetchZephrDataLayer(session) {
  // Get the session cookie to add the header.
  const { sessionCookie: cookie = '' } = session || {};

  // Fetch dataLayer.
  const response = await fetch(
    `${process.env.ZEPHR_ROOT_URL}/blaize/datalayer`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        cookie,
      },
      credentials: 'include',
    }
  );

  // Return data if invalid or redirected.
  if (response.ok) {
    const data = await response.json();

    return data;
  }

  if (! response.ok) {
    debug(await response.text());
    throw new Error(await response.text());
  }

  return null;
}
