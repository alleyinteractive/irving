import URL from 'url-parse';
import globToRegExp from 'glob-to-regexp';
import { getConfigArray } from 'utils/getConfigValue';
import addTrailingSlash from './addTrailingSlash';

// Create RegExp version of proxy globs.
const proxyPassthrough = getConfigArray('proxyPassthrough');
const proxyRegExp = proxyPassthrough.map(globToRegExp);

/**
 * Normalize internal urls to be relative. Reject external urls.
 * @param {string} url
 * @returns {string|boolean} - relative url, or false if not an internal url
 */
export default function getRelativeUrl(url) {
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
      protocol,
      host,
      hostname,
      query,
      hash,
    } = urlObj;

    /**
     * Consider provided target URL to be relative (and transform/return it accordingly) only if:
     * - Link URL host is the same as current (window.location) host
     * - URL does not begin with a hash
     * - Protocol isn't set or is either http or https
     * - Target URL does not match one of the configured passthrough proxies
     */
    if (
      (
        host === window.location.host ||
        hostname === window.location.hostname
      ) &&
      (
        'http:' === protocol ||
        'https:' === protocol ||
        ! protocol
      ) &&
      '#' !== url[0] &&
      ! proxyRegExp.some((proxy) => proxy.test(url))
    ) {
      // Internal URL, add query and hash.
      result = `${addTrailingSlash(urlPath)}${(query || '')}${(hash || '')}`;
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
