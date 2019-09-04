const path = require('path');
const express = require('express');
const auth = require('./auth');
// App must be built using the build command before production mode can be run.
const clientStats = require('../build/client/stats.json');
const { default: serverRenderer } = require('../build/server/main.bundle');
const { maybeRequireUserModule } = require('../utils/maybeRequireUserModule');

/**
 * Add the required middleware to support running the app in production mode.
 * @param {object} app - express application
 */
const productionMiddleware = (app) => {
  // Allow customization of production server
  maybeRequireUserModule('server/customizeProdServer.js')(app);

  // @todo should this be included in core or optional?
  app.use(auth);

  app.use(express.static(path.resolve('./build/client'), {
    maxage: 86400000,
  }));

  const options = { clientStats };
  app.use(serverRenderer(options));
};

module.exports = productionMiddleware;
