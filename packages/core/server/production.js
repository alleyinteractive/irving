/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const { nodeRequire } = require('../utils/nodeRequire');
const {
  clientBuild,
  serverConfig,
  serverBuild,
} = require('../config/paths');
const path = require('path');
const express = require('express');
const createCheckAuth = require('./auth');
const userConfig = require(serverConfig);
const { appRoot } = require('../config/paths');
const getConfigFromFiles = require('../config/getConfigFromFiles');

// App must be built using the build command before production mode can be run.
const clientStats = nodeRequire(
  path.join(clientBuild, 'stats.json')
);
const {
  default: serverRenderer,
} = require(path.join(serverBuild, 'main.bundle'));

/**
 * Add the required middleware to support running the app in production mode.
 * @param {object} app - express application
 */
const productionMiddleware = async (app) => {
  // Allow customization of production server
  const irvingProdMiddleware = getConfigFromFiles(
    'server/customizeProdServer.js',
    appRoot,
    []
  );
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

export default productionMiddleware;
