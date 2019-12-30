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
      hostname,
      query,
      hash,
    } = urlObj;

    /**
     * Add trailing slashes and remove hostname only under below conditions:
     * - current hostname is included in the provided target URL
     * - protocol isn't set or is either http or https
     * - target URL does not match one of the configured passthrough proxies
     */
    if (
      (
        hostname.includes(window.location.hostname) ||
        window.location.hostname.includes(hostname)
      ) &&
      (
        'http:' === protocol ||
        'https:' === protocol ||
        ! protocol
      ) &&
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
