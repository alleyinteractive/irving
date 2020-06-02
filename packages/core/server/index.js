/* eslint-disable global-require, no-console, import/first */
import getMonitorService from '@irvingjs/services/monitorService';
import logService from '@irvingjs/services/getLogService';
import { appRoot } from '../config/paths';
import getConfigFromFiles from '../config/getConfigFromFiles';

const {
  API_ROOT_URL,
  API_ORIGIN,
} = process.env;

// Start monitor service as early as possible.
const monitorService = getMonitorService();
monitorService().start();

// Shim some browser-only global variables.
import '../utils/shimWindow';

const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const { getConfigFromProject } = require('../config/getConfigFromProject');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const customizeRedirect = require('./customizeRedirect');

// Start log service.
const log = logService('irving:server');

// Create app.
const app = express();

// Clearing the Redis cache.
app.post('/purge-cache', bodyParser.json(), purgeCache);
app.get('/cache-keys', getCacheKeys);

// Set view engine.
app.set('view engine', 'ejs');

// Run all customize server functions.
const irvingServerMiddleware = getConfigFromFiles(
  'server/customizeServer.js',
  appRoot,
  []
);
irvingServerMiddleware.forEach((middleware) => middleware(app));

// Set up a reusable proxy for responses that should be served directly.
const proxyPassthrough = getConfigFromProject('proxyPassthrough', []);
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
const serverExportMiddleware = getConfigFromFiles(
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
