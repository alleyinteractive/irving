import URL from 'url-parse';
import globToRegExp from 'glob-to-regexp';
import { getConfigArray } from 'utils/getConfigValue';
import addTrailingSlash from './addTrailingSlash';

const proxyPassthrough = getConfigArray('proxyPassthrough');

/**
 * Normalize internal urls to be relative. Reject external urls.
 * @param {string} url
 * @returns {string|boolean} - relative url, or false if not an internal url
 */
export default function getRelativeUrl(url) {
  let result = false;
  const proxyRegExp = proxyPassthrough.map(globToRegExp);

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
      query,
      hash,
    } = urlObj;

    // Add trailing slashes and remove host only under below conditions.
    if (
      (
        host === window.location.host ||
        host.includes(window.location.host) ||
        window.location.host.includes(host)
      ) &&
      ('http:' === protocol || 'https:' === protocol) &&
      ! proxyRegExp.some((proxy) => proxy.test(url))
    ) {
      // Internal URL, add query and hash.
      result = addTrailingSlash(urlPath) + (query || '') + (hash || '');
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
