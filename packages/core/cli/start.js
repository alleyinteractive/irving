/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const { rootUrl } = require('../config/paths');
const getValueFromFiles = require('../config/irving/getValueFromFiles');
const coreStartServer = require('../server/startServer');
const coreLogService = require('../services/logService');
const app = require('../server');

// Create logger
const createLogger = getValueFromFiles(
  'services/logService.js',
  coreLogService
);
const log = createLogger('irving:server');

// Set up environmental variables as early as possible.
require('../config/env')();

// Allow customization of how server is created.
const startServer = getValueFromFiles(
  'server/startServer.js',
  coreStartServer
);

// Start the server.
const started = startServer(app);

// Fall back to core.
if (! started) {
  coreStartServer(app);
}

// Open app for convenience and to get the initial build started.
if ('development' === process.env.NODE_ENV) {
  const openBrowser = require('react-dev-utils/openBrowser');
  const defaultRoot = process.env.DEV_URL ||
    `https://localhost:${process.env.PORT || '3001'}`;
  openBrowser(rootUrl || defaultRoot);
}

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  log.error(err);

  if ('production' !== process.env.NODE_ENV) {
    throw err;
  }
});
