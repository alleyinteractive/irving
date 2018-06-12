const path = require('path');
const express = require('express');
const clientStats = require('../build/client/stats.json');
const serverRenderer = require('../build/server/main.bundle');

const prodMode = (app) => {
  app.use(express.static(path.resolve('./build/client'), {
    maxage: 86400000,
  }));

  app.use(serverRenderer.default({ clientStats }));
};

module.exports = prodMode;
