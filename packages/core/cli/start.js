/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const path = require('path');
const { serverBuild, appRoot, rootUrl } = require('../config/paths');
const getConfigFromFiles = require('../config/getConfigFromFiles');
const startServer = require('../server/startServer');
const app = require(path.join(serverBuild, 'main.bundle'));

// Create logger
const coreLogService = require('./logService');
const createLogger = getConfigFromFiles(
  'services/logService.js',
  appRoot,
  coreLogService
)();
const log = createLogger('irving:server');

// Set up environmental variables as early as possible.
const getEnv = require('../config/env');
getEnv();

// Allow customization of how server is created.
const configStartServer = getConfigFromFiles(
  'server/startServer.js',
  appRoot,
  startServer
);

// Start the server.
configStartServer(app);

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
