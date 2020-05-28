import nodeRequire from 'utils/nodeRequire';
import { clientBuild } from 'config/paths';
import serverRenderer from './serverRenderer';
const path = require('path');
const express = require('express');
// App must be built using the build command before production mode can be run.
const clientStats = nodeRequire(
  path.join(clientBuild, 'stats.json')
);
const createCheckAuth = require('./auth');
const getConfigField = require('../utils/getConfigField');

/**
 * Add the required middleware to support running the app in production mode.
 * @param {object} app - express application
 */
const productionMiddleware = async (app) => {
  // Allow customization of production server
  const irvingProdMiddleware = getConfigField('customizeProdServer');
  irvingProdMiddleware.forEach((middleware) => middleware(app));

  app.use(createCheckAuth('irving'));

  app.use(express.static(path.resolve('./build/client'), {
    maxAge: 86400000,
  }));

  const options = { clientStats };
  app.use(serverRenderer(options));
};

export default productionMiddleware;
