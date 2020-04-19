import userConfig from '@irvingjs/irving.config';
import getConfigField from 'utils/getConfigField';

const trailingSlashDenylist = getConfigField('trailingSlashDenylist');

/**
 * Add a trailling slash to a URL if required (and the appropriate config value is set).
 * @param {string} url - URL to which trailing slash should be added.
 * @returns {string} - URL with trailing slash.
 */
export default function addTrailingSlash(
  url,
  replace = userConfig.forceTrailingSlashes
) {
  // Add a trailing slash, if relevant env var is configured.
  if (replace) {
    const splitUrl = url.split('/');

    if (
      '/' !== url[url.length - 1] &&
      // Don't add trailing slashes to filepaths.
      ! splitUrl[splitUrl.length - 1].includes('.') &&
      // Don't add trailling slashes to any URL/path configured in the denylist.
      ! trailingSlashDenylist.some((path) => (
        url.includes(path) || path.includes(url)
      ))
    ) {
      return `${url}/`;
    }
  }

  return url;
}
