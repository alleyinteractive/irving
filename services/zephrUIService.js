import createDebug from './createDebug';
const debug = createDebug('zephr:UIComponents');

/**
 * Query the component endpoint through the Zephr CDN to add any transformed
 * components to the state.
 *
 * @param {string} pageID The post ID of the current page, if set.
 */
export default async function fetchZephrUIComponents({ pageID, session }) {
  const contentQuery = pageID ? `content_id=${pageID}` : '';
  const endpoint = `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents?${contentQuery}`; // eslint-disable-line max-len

  // Add the session cookie to the header, if set.
  const fetchOpts = () => {
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    // Parse sessionCookie out of session selector.
    const { sessionCookie = false } = session || {};
    // If no session cookie, return the headers as they are.
    if (! sessionCookie) {
      return options;
    }

    // Look in the session cookie for the blaize_session id.
    const matches = sessionCookie.match(/(?<=\bblaize_session=)([^;]*)/);

    // If there are matches, add them to the header object in options.
    if (0 < matches.length) {
      const [sessionID] = matches;
      options.headers.Cookie = `blaize_session=${sessionID}`;
    }

    // Return modified options object.
    return options;
  };

  // Fetch data for component.
  const response = await fetch(endpoint, fetchOpts());

  // Return data if invalid or redirected.
  if (response.ok) {
    const data = await response.json();

    return data;
  }

  if (! response.ok) {
    debug(response.text());
    throw new Error(await response.text());
  }

  return null;
}
