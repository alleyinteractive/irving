import createDebug from './createDebug';
const debug = createDebug('zephr:UIComponents');

const fetchOpts = {
  headers: {
    Accept: 'application/json',
  },
};

export default async function fetchZephrUIComponents() {
  const endpoint = `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents`; // eslint-disable-line max-len

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
