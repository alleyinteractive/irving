/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
import nodeRequire from 'utils/nodeRequire';
import { clientBuild, serverConfig } from 'config/paths';
import serverRenderer from './serverRenderer';
const path = require('path');
const express = require('express');
// App must be built using the build command before production mode can be run.
const clientStats = nodeRequire(
  path.join(clientBuild, 'stats.json')
);
const createCheckAuth = require('./auth');
const userConfig = require(serverConfig);
const getConfigField = require('../utils/getConfigField');

/**
 * Add the required middleware to support running the app in production mode.
 * @param {object} app - express application
 */
const productionMiddleware = async (app) => {
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

export default productionMiddleware;
