/* eslint-disable global-require, no-console, import/order */
const {
  API_ROOT_URL,
  API_ORIGIN,
} = process.env;

// Start monitor service as early as possible.
const getService = require('../services/monitorService');
getService().start();

// Shim some browser-only global variables.
require('../utils/shimWindow');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const getConfigField = require('../utils/getConfigField');
const { getConfigArray } = require('../utils/getConfigValue');

const getLogService = require('../services/logService');
const customizeRedirect = require('./customizeRedirect');
const log = getLogService('irving:server');
const app = express();

// Cache-related endpoints.
require('./cache')(app);

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
  secure: 'development' !== process.env.NODE_ENV,
  target: API_ORIGIN || API_ROOT_URL.replace('/wp-json/irving/v1', ''),
  xfwd: true,
});

// Create proxies for each configured proxy pattern.
proxyPassthrough.forEach((pattern) => {
  app.use(pattern, passthrough);
});

// Add universal cookies middleware.
app.use(cookiesMiddleware());

// Customize Redirect.
app.use(customizeRedirect());

if ('development' === process.env.NODE_ENV) {
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

// Run all export server functions.
const serverExportMiddleware = getConfigField('exportServer');
serverExportMiddleware.forEach((middleware) => middleware(app));

module.exports = app;
