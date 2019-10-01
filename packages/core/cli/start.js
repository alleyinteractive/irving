/* eslint-disable global-require, no-console, import/order */
const express = require('express');

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const getConfigField = require('../utils/getConfigField');
const getService = require('../services/monitorService');
getService().start();

const createDebug = require('../services/createDebug');
const debug = createDebug('server:error');
const createServer = require('../server/createServer');
const {
  rootUrl,
  serverConfig: serverConfigPath,
} = require('../config/paths');
// eslint-disable-next-line import/no-dynamic-require
const serverConfig = require(serverConfigPath);
const bustCache = require('../server/bustCache');
const bustPageCache = require('../server/bustPageCache');

const {
  PORT = 3001,
  NODE_ENV,
} = process.env;
const app = express();

// Clearing the Redis cache.
app.get('/bust-endpoint-cache', bustPageCache);
app.get('/bust-entire-cache', bustCache);

// Set view engine.
app.set('view engine', 'ejs');

// Run all customize server functions.
const irvingServerMiddleware = getConfigField('customizeServer');
irvingServerMiddleware.forEach((middleware) => middleware(app));

if ('development' === NODE_ENV) {
  require('../server/development')(app);
} else {
  require('../server/production')(app);
}

// Default error handler
app.use((err, req, res, next) => {
  debug(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

// Allow customization of how server is created.
// Run all customize server functions.
let server;
if (serverConfig.createServer) {
  server = serverConfig.createServer(app);
} else {
  server = createServer(app);
}

server.listen(PORT);
console.log(`Server listening on port ${PORT}!`);

// Open app for convenience and to get the initial build started.
if ('development' === NODE_ENV) {
  const openBrowser = require('react-dev-utils/openBrowser');
  openBrowser(rootUrl);
}

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  debug(err);

  if ('production' !== NODE_ENV) {
    throw err;
  }
});
