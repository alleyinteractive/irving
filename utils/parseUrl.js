import URI from 'urijs';

/**
 *
 * @param url
 * @returns {*}
 */
export default function parseUrl(url) {
  if ('string' !== typeof url) {
    return false;
  }

  const uri = URI(url);
  console.log(uri.host(), window.location.host);
  if (uri.host() === window.location.host) {
    return { external: false, path: url.path };
  }

  return { external: true, url };
}
