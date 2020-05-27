const path = require('path');
const express = require('express');
const createCheckAuth = require('./auth');
const {
  clientBuild,
  serverBuild,
  serverConfig,
} = require('../config/paths');
const userConfig = require(serverConfig);
const getConfigField = require('../utils/getConfigField');
// App must be built using the build command before production mode can be run.
/* eslint-disable import/no-dynamic-require */
const clientStats = require(path.join(clientBuild, 'stats.json'));
const {
  default: serverRenderer,
} = require(path.join(serverBuild, 'main.bundle'));
/* eslint-enable */

/**
 * Add the required middleware to support running the app in production mode.
 * @param {object} app - express application
 */
const productionMiddleware = (app) => {
  // Allow customization of production server
  const irvingProdMiddleware = getConfigField('customizeProdServer');
  irvingProdMiddleware.forEach((middleware) => middleware(app));

  // Add basic auth handling if user configures it.
  if (userConfig.basicAuth) {
    app.use(createCheckAuth('irving'));
  }

  app.use(express.static(path.resolve('./build/client'), {
    maxAge: 86400000,
  }));

  const options = { clientStats };
  app.use(serverRenderer(options));
};

module.exports = productionMiddleware;
