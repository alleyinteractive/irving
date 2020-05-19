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
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const getConfigField = require('../utils/getConfigField');
const {
  getConfigArray
} = require('../utils/getConfigValue');

const getLogService = require('../services/logService');
const startServer = require('../server/startServer');
const {
  rootUrl
} = require('../config/paths');
const customizeRedirect = require('../server/customizeRedirect');
const bustCache = require('../server/bustCache');
const bustPageCache = require('../server/bustPageCache');
const purgePageCache = require('../server/purgePageCache');

const log = getLogService('irving:server');
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
  require('../server/development')(app);
} else {
  require('../server/production')(app);
}

// Default error handler
app.use((err, req, res, next) => {
  log.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

// Allow customization of how server is created.
// Run all customize server functions.
const server = getConfigField('startServer')(app);
if (!server) {
  startServer(app);
}

// Open app for convenience and to get the initial build started.
if ('development' === NODE_ENV) {
  const openBrowser = require('react-dev-utils/openBrowser');
  openBrowser(rootUrl);
}

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  log.error(err);

  if ('production' !== NODE_ENV) {
    throw err;
  }
});
