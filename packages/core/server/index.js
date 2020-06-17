/* eslint-disable global-require, no-console, import/first, import/order */
// Start monitor service as early as possible.
const getMonitorService = require('@irvingjs/services/monitorService');
const monitorService = getMonitorService();
monitorService().start();

const getEnv = require('../config/env');
const {
  API_ROOT_URL,
  API_ORIGIN,
} = getEnv();

// Shim some browser-only global variables.
require('../utils/shimWindow');

const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const { appRoot } = require('../config/paths');
const getValueFromFiles = require('../config/irving/getValueFromFiles');
const { getValueFromMergedConfig } = require('../config/irving/getValueFromMergedConfig');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const customizeRedirect = require('./customizeRedirect');

// Start log service.
import logService from '@irvingjs/services/getLogService';
const log = logService('irving:server');

// Create app.
const app = express();

// Clearing the Redis cache.
app.post('/purge-cache', bodyParser.json(), purgeCache);
app.get('/cache-keys', getCacheKeys);

// Set view engine.
app.set('view engine', 'ejs');

// Run all customize server functions.
const irvingServerMiddleware = getValueFromFiles(
  'server/customizeServer.js',
  appRoot,
  []
);
irvingServerMiddleware.forEach((middleware) => middleware(app));

// Set up a reusable proxy for responses that should be served directly.
const proxyPassthrough = getValueFromMergedConfig('proxyPassthrough', []);
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

// Naked Redirect.
app.use(customizeRedirect());

// Only load the appropriate middleware for the current env.
if (
  'development_client' === process.env.IRVING_EXECUTION_CONTEXT ||
  'development_server' === process.env.IRVING_EXECUTION_CONTEXT
) {
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

// Run all export server functions.
const serverExportMiddleware = getValueFromFiles(
  'server/exportServer.js',
  appRoot,
  []
);

module.exports = serverExportMiddleware.reduce(
  (acc, middleware) => {
    const exportApp = middleware(app);

    if (exportApp) {
      return exportApp;
    }

    return acc;
  },
  app
);
