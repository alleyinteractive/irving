import URL from 'url-parse';

/**
 * Normalize internal urls to be relative. Reject external urls.
 * @param {string} url
 * @returns {string|boolean} - relative url, or false if not an internal url
 */
export default function getRelativeUrl(url) {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
  let result = false;

  if ('string' !== typeof url) {
    return false;
  }

  try {
    // Check if url is absolute, but internal.
    const urlObj = new URL(url);
    const {
      pathname: urlPath,
    } = urlObj;
    const {
      host,
      query,
      hash,
    } = urlObj;

    if (
      host === window.location.host ||
      host.includes(window.location.host) ||
      window.location.host.includes(host)
    ) {
      let internalPath = urlPath;

      // Add a trailing slash, if relevant env var is configured.
      if (env.CONFIG_FORCE_TRAILING_SLASHES) {
        internalPath = (
          '/' !== urlPath[urlPath.length - 1] &&
          ! urlPath.includes('.')
        ) ? `${urlPath}/` : urlPath;
      }

      // Internal URL, add query and hash.
      result = internalPath + (query || '') + (hash || '');
    } else {
      // External URL, not relative.
      result = false;
    }
  } catch (e) {
    // In case an error occurs, assume URL is not relative.
    result = false;
  }

  return result;
}
