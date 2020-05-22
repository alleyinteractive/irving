/* eslint-disable global-require, no-console, import/order */
// Get environmental variables
const getEnv = require('../config/env');
const {
  API_ROOT_URL,
  API_ORIGN,
  NODE_ENV,
} = getEnv();

// Start monitor service as early as possible.
const getService = require('../services/monitorService');
getService().start();

// Shim some browser-only global variables.
require('../utils/shimWindow');

const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const getConfigField = require('../utils/getConfigField');
const { getConfigArray } = require('../utils/getConfigValue');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const customizeRedirect = require('./customizeRedirect');
const getLogService = require('../services/logService');
const log = getLogService('irving:server');
const app = express();

// Clearing the Redis cache.
app.post('/purge-cache', bodyParser.json(), purgeCache);
app.get('/cache-keys', getCacheKeys);

// Set view engine.
app.set('view engine', 'ejs');

// Run all customize server functions.
const irvingServerMiddleware = getConfigField('customizeServer');
irvingServerMiddleware.forEach((middleware) => middleware(app));

// Set up a reusable proxy for responses that should be served directly.
const proxyPassthrough = getConfigArray('proxyPassthrough');
const passthrough = createProxyMiddleware({
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

// Naked Redirect.
app.use(customizeRedirect());

if ('development' === NODE_ENV) {
  require('./development').default(app);
} else {
  require('./production').default(app);
}

// Default error handler
app.use((err, req, res, next) => {
  log.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

module.exports = app;
