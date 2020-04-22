/* eslint-disable global-require, no-console, import/order */
const express = require('express');
const proxy = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const getConfigField = require('../utils/getConfigField');
const { getConfigArray } = require('../utils/getConfigValue');
const getService = require('../services/monitorService');
getService().start();

const getLogService = require('../services/logService');
const log = getLogService('irving:server:error');
const bustCache = require('./bustCache');
const bustPageCache = require('./bustPageCache');
const purgePageCache = require('./purgePageCache');

const { API_ROOT_URL, API_ORIGN, NODE_ENV } = process.env;
const app = express();

// Clearing the Redis cache.
app.get('/bust-endpoint-cache', bustPageCache);
app.get('/bust-entire-cache', bustCache);
app.purge('/*', purgePageCache);

// Set view engine.
app.set('view engine', 'ejs');

// Run all customize server functions.
const irvingServerMiddleware = getConfigField('customizeServer');
irvingServerMiddleware.forEach((middleware) => middleware(app));

// Set up a reusable proxy for responses that should be served directly.
const proxyPassthrough = getConfigArray('proxyPassthrough');
const passthrough = proxy({
  changeOrigin: true,
  followRedirects: true,
  secure: 'development' !== NODE_ENV,
  // @todo make this not specific to WP eventually.
  target: API_ORIGN || API_ROOT_URL.replace('/wp-json/irving/v1', ''),
  xfwd: true,
});

// Create proxies for each configured proxy pattern.
proxyPassthrough.forEach((pattern) => {
  app.use(pattern, passthrough);
});

// Add universal cookies middleware.
app.use(cookiesMiddleware());

if ('development' === NODE_ENV) {
  require('./development')(app);
} else {
  require('./production')(app);
}

// Default error handler
app.use((err, req, res, next) => {
  log.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

// Export it.
module.exports = app;
