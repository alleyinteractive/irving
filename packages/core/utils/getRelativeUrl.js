// Global passed in via webpack define plugin
/* global proxyPassthrough */
import URL from 'url-parse';
import globToRegExp from 'glob-to-regexp';
import addTrailingSlash from './addTrailingSlash';

// Create RegExp version of proxy globs.
const proxyRegExp = proxyPassthrough.map(globToRegExp);

/**
 * Replace www.
 *
 * @param {string} urlString Original URL string (or part of URL).
 * @returns {string|boolean} URL with replacement made.
 */
const replacewww = (urlString) => (
  urlString.replace('www.', '')
);

/**
 * Normalize internal urls to be relative. Reject external urls.
 * @param {string} url
 * @returns {string|boolean} Relative url, or false if not an internal url
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
      protocol,
      pathname: urlPath,
      host,
      hostname,
      query,
      hash,
    } = urlObj;
    const urlHost = replacewww(host);
    const urlHostname = replacewww(hostname);
    const windowHost = replacewww(window.location.host);
    const windowHostname = replacewww(window.location.hostname);

    /**
     * Consider provided target URL to be relative (and transform/return it accordingly) only if:
     * - Link URL host is the same as current (window.location) host
     * - URL does not begin with a hash
     * - Protocol isn't set or is either http or https
     * - Target URL does not match one of the configured passthrough proxies
     */
    if (
      (
        urlHost === windowHost ||
        urlHostname === windowHostname ||
        'localhost' === windowHostname
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
