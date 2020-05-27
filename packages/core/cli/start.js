const {
  rootUrl
} = require('../config/paths');

const getConfigField = require('../utils/getConfigField');
const startServer = require('../server/startServer');
const app = require('../server');

const {
  NODE_ENV
} = process.env;

// Allow customization of how server is created.
// Run all customize server functions.
const server = getConfigField('startServer')(app);
if (! server) {
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
