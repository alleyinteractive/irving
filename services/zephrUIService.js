import createDebug from './createDebug';
const debug = createDebug('zephr:UIComponents');

const fetchOpts = {
  headers: {
    Accept: 'application/json',
    blaize_session: '', // Need to get from
  },
};

/**
 * Query the component endpoint through the Zephr CDN to add any transformed
 * components to the state.
 *
 * @param {string} pageID The post ID of the current page, if set.
 */
export default async function fetchZephrUIComponents(pageID) {
  const contentQuery = pageID ? `content_id=${pageID}` : '';
  const endpoint = `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents?${contentQuery}`; // eslint-disable-line max-len

  // Fetch data for component.
  const response = await fetch(endpoint, fetchOpts);

  // Return data if invalid or redirected
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
