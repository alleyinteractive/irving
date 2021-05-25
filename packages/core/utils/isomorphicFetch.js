const realFetch = require('node-fetch');
const URL = require('url-parse');

module.exports = function isomorphicFetch(url, options) {
  const newUrl = URL(url);

  // Resolves node error with fetch URLs missing a protocol.
  if (!newUrl.protocol) {
    newUrl.set('protocol', 'https');
  }

  // Resolves node error involving unescaped characters in fetch URLs.
  const normalizedUrl = encodeURI(newUrl.toString());

  return realFetch.call(this, normalizedUrl, options);
};

if (!global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
