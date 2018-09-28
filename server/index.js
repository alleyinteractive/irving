/* eslint-disable */

/* eslint-disable global-require, no-console */

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const getService = require('../services/monitorService');
getService().start();

const createDebug = require('../services/createDebug');
const debug = createDebug('server:error');

const os = require('os');
const fs = require('fs');
const http = require('http');
const path = require('path');
const https = require('https');
const express = require('express');
const { PORT = 3001, NODE_ENV } = process.env;
const app = express();
let proxyInstance;

app.set('views', 'server/views');
app.set('view engine', 'ejs');

if ('development' === NODE_ENV) {
  require('./development')(app);
  // const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
  // const { localUrlForBrowser } = prepareUrls('http', 'localhost', PORT);
  // const openBrowser = require('react-dev-utils/openBrowser');
  // openBrowser(localUrlForBrowser);

  const proxy = require('http-proxy-middleware');
  proxyInstance = proxy(
    '**',
    {
      context: '**',
      target: `https://${PORT}-httpsproxy.alley.test`,
      changeOrigin: true,
      ws: true,
    }
  );
  app.use(proxyInstance);
} else {
  require('./production')(app);
}

// Default error handler
app.use((err, req, res, next) => {
  debug(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

const privateKey  = fs.readFileSync(
  path.join(
    os.homedir(),
    'broadway/config/nginx-config/server.key'
  ),
  'utf8'
);
const certificate = fs.readFileSync(
  path.join(
    os.homedir(),
    'broadway/config/nginx-config/server.crt'
  ),
  'utf8'
);

const server = https.createServer({ key: privateKey, cert: certificate }, app);
server.listen(PORT);
console.log(`Server listening on port ${PORT}!`);

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  debug(err);

  if ('production' !== process.env.NODE_ENV) {
    throw err;
  }
});
