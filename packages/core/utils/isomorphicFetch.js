const realFetch = require('node-fetch');
const URL = require('url-parse');

module.exports = function isomorphicFetch(url, options) {
  const newUrl = URL(url);

  if (! newUrl.protocol) {
    newUrl.set('protocol', 'https');
  }

  return realFetch.call(this, newUrl.toString(), options);
};

if (! global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
