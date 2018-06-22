import { URL } from 'whatwg-url';

/**
 *
 * @param url
 * @returns {*}
 */
export default function getRelativeUrl(url) {
  if ('string' !== typeof url) {
    return false;
  }

  try {
    // Check if url is absolute, but internal.
    const urlObj = new URL(url);
    if (urlObj.host === window.location.host) {
      return urlObj.pathname;
    }
  } catch (e) {
    // Already a relative url.
    return url;
  }

  // External absolute url.
  return false;
}
