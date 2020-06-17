/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const { appRoot, rootUrl } = require('../config/paths');
const getValueFromFiles = require('../config/irving/getValueFromFiles');
const coreStartServer = require('../server/startServer');
const coreLogService = require('../services/logService');
const app = require('../server');

// Create logger
const createLogger = getValueFromFiles(
  'services/logService.js',
  appRoot,
  coreLogService
);
const log = createLogger('irving:server');

// Set up environmental variables as early as possible.
const getEnv = require('../config/env');
getEnv();

// Allow customization of how server is created.
const startServer = getValueFromFiles(
  'server/startServer.js',
  appRoot,
  coreStartServer
);

// Start the server.
startServer(app);

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
