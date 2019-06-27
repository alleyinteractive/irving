import URL from 'url-parse';

/**
 * Normalize internal urls to be relative. Reject external urls.
 * @param {string} url
 * @returns {string|boolean} - relative url, or false if not an internal url
 */
export default function getRelativeUrl(url) {
  if ('string' !== typeof url) {
    return false;
  }

  try {
    // Check if url is absolute, but internal.
    const urlObj = new URL(url);
    if (urlObj.host === window.location.host) {
      return urlObj.pathname +
        (urlObj.query ? urlObj.query : '') +
        (urlObj.hash ? urlObj.hash : '');
    }
  } catch (e) {
    // Already a relative url.
    return url;
  }

  // External absolute url.
  return false;
}
