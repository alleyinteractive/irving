/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const { nodeRequire } = require('../utils/nodeRequire');
const {
  clientBuild,
  serverBuild,
} = require('../config/paths');
const getEnv = require('../config/irving/getEnv');
const path = require('path');
const express = require('express');
const createCheckAuth = require('./auth');
const getValueFromFiles = require('../config/irving/getValueFromFiles');

// App must be built using the build command before production mode can be run.
const clientStats = nodeRequire(
  path.join(clientBuild, 'stats.json')
);
const {
  default: serverRenderer,
} = require(path.join(serverBuild, 'main.bundle'));

/**
 * Add the required middleware to support running the app in production mode.
 *
 * @param {object} app Express application
 */
const productionMiddleware = async (app) => {
  // Allow customization of production server
  const irvingProdMiddleware = getValueFromFiles(
    'server/customizeProdServer.js',
    [() => {}]
  );
  irvingProdMiddleware.forEach((middleware) => middleware(app));

  // Add basic auth handling if user configures it.
  app.use((req, res, next) => {
    const { BASIC_AUTH } = getEnv(req.hostname);

    if (BASIC_AUTH) {
      createCheckAuth('irving')(req, res, next);
    } else {
      next();
    }
  });

  app.use(express.static(path.resolve('./build/client'), {
    maxAge: 86400000,
  }));

  const options = { clientStats };
  app.use(serverRenderer(options));
};

module.exports = productionMiddleware;
