import URL from 'url-parse';

/**
 * Normalize internal urls to be relative. Reject external urls.
 * @param {string} url
 * @returns {string|boolean} - relative url, or false if not an internal url
 */
export default function getRelativeUrl(url) {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle

  if ('string' !== typeof url) {
    return false;
  }

  try {
    // Check if url is absolute, but internal.
    const urlObj = new URL(url);
    let {
      pathname: urlPath,
    } = urlObj;
    const {
      host,
      query,
      hash,
    } = urlObj;

    // Add a trailing slash, if relevant env var is configured.
    if (env.CONFIG_FORCE_TRAILING_SLASHES) {
      urlPath = (
        '/' !== urlPath[urlPath.length - 1] &&
        ! urlPath.includes('.')
      ) ? `${urlPath}/` : urlPath;
    }

    // Internal URL, add query and hash.
    if (host === window.location.host) {
      return urlPath + (query || '') + (hash || '');
    }
  } catch (e) {
    // Already a relative url.
    return url;
  }

  // External absolute url.
  return false;
}
