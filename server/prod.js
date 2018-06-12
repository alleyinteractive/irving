const path = require('path');
const express = require('express');
const clientStats = require('../build/client/stats.json');
const { default: serverRenderer } = require('../build/server/main.bundle');

/**
 * Add the required middleware to support running the app in production mode.
 * @param {object} app - express application
 */
const prodMode = (app) => {
  app.use(express.static(path.resolve('./build/client'), {
    maxage: 86400000,
  }));

  const options = { clientStats };
  app.use(serverRenderer(options));
};

module.exports = prodMode;
