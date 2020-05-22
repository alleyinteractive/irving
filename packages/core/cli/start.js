/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const path = require('path');
const { serverBuild, rootUrl } = require('../config/paths');
const getConfigField = require('../utils/getConfigField');
const startServer = require('../server/startServer');
const getLogService = require('../services/logService');
const log = getLogService('irving:server');
const app = require(path.join(serverBuild, 'main.bundle'));

// Allow customization of how server is created.
// Run all customize server functions.
const server = getConfigField('startServer')(app);
if (! server) {
  startServer(app);
}

// Open app for convenience and to get the initial build started.
if ('development' === process.env.NODE_ENV) {
  const openBrowser = require('react-dev-utils/openBrowser');
  openBrowser(rootUrl);
}

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  log.error(err);

  if ('production' !== process.env.NODE_ENV) {
    throw err;
  }
});
