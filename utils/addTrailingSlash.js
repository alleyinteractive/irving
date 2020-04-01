/**
 * Add a trailling slash to a URL if required (and the appropriate config value is set).
 * @param {string} url - URL to which trailing slash should be added.
 * @returns {string} - URL with trailing slash.
 */
export default function addTrailingSlash(url) {
  const splitUrl = url.split('/');

  if (
    '/' !== url[url.length - 1] &&
    // Don't add trailing slashes to filepaths.
    ! splitUrl[splitUrl.length - 1].includes('.')
  ) {
    return `${url}/`;
  }

  return url;
}
