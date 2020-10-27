/* eslint-disable global-require, no-console, import/first, import/order */
// Start monitor service as early as possible.
const getMonitorService = require(
  '../services/monitorService/getServiceFromFilesystem'
);
const monitorService = getMonitorService();
monitorService.start();

const getEnv = require('../config/env');
const {
  API_ROOT_URL,
  API_ORIGIN,
} = getEnv();

const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const proxyPassthrough = require('../config/proxyPassthrough');
const getValueFromFiles = require('../config/irving/getValueFromFiles');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const customizeRedirect = require('./customizeRedirect');

const multisiteContext = require('../config/irving/requireMultisiteConfig');
const maybeReplaceRootVars = require('../utils/maybeReplaceRootVars');

// Start log service.
const logService = require('../services/logService/getServiceFromFilesystem');
const log = logService('irving:server');

// Create app.
const app = express();

app.use((req, res, next) => {
  maybeReplaceRootVars(process.env, multisiteContext, req.hostname);
  next();
});

// Clearing the Redis cache.
app.post('/purge-cache', bodyParser.json(), purgeCache);
app.get('/cache-keys', getCacheKeys);

// Set view engine.
app.set('view engine', 'ejs');

// Run all customize server functions.
const irvingServerMiddleware = getValueFromFiles(
  'server/customizeServer.js',
  [() => {}]
);
irvingServerMiddleware.forEach((middleware) => middleware(app));

// Set up a reusable proxy for responses that should be served directly.
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
const serverExportMiddleware = getValueFromFiles(
  'server/exportServer.js',
  [() => {}]
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
