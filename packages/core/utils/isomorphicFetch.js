const realFetch = require('node-fetch');

module.exports = function isomorphicFetch(url, options) {
  let newUrl = url;

  if (/^\/\//.test(newUrl)) {
    newUrl = `https:${newUrl}`;
  }

  return realFetch.call(this, newUrl, options);
};

if (! global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
