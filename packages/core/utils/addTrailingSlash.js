import userConfig from '@irvingjs/irving.config';

/**
 * Add a trailling slash to a URL if required (and the appropriate ENV var is set).
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

    return (
      '/' !== url[url.length - 1] &&
      // Don't add trailing slashes to filepaths.
      ! splitUrl[splitUrl.length - 1].includes('.')
    ) ? `${url}/` : url;
  }

  return url;
}
