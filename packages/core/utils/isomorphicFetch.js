const realFetch = require('node-fetch');
const URL = require('url-parse');
const logService = require('../services/logService/getService');
const log = logService('irving:isomorphicFetch');

module.exports = function isomorphicFetch(url, options) {
  const newUrl = URL(url);
  let response;

  // Resolves node error with fetch URLs missing a protocol.
  if (! newUrl.protocol) {
    newUrl.set('protocol', 'https');
  }

  // Resolves node error involving unescaped characters in fetch URLs.
  const normalizedUrl = encodeURI(newUrl.toString());

  try {
    response = realFetch.call(this, normalizedUrl, options);
  } catch (err) {
    log.error(err, {
      tags: {
        errorUrl: normalizedUrl,
      },
    });
    response = err;
  }

  return response;
};

if (! global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
