/* eslint-disable global-require, no-console */

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const http = require('http');
const https = require('https');
const express = require('express');

const getService = require('../services/monitorService');
getService().start();

const createDebug = require('../services/createDebug');
const debug = createDebug('server:error');
const { rootUrl } = require('../config/paths');
const bustCache = require('./bustCache');
const bustPageCache = require('./bustPageCache');
const purgePageCache = require('./purgePageCache');

const {
  PORT = 3001,
  NODE_ENV,
  HTTPS_KEY_PATH,
  HTTPS_CERT_PATH,
} = process.env;
const app = express();

// Clearing the Redis cache.
app.get('/bust-endpoint-cache', bustPageCache);
app.get('/bust-entire-cache', bustCache);
app.purge(purgePageCache);

app.set('views', 'server/views');
app.set('view engine', 'ejs');

if ('development' === NODE_ENV) {
  require('./development')(app);
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

let server;
if (HTTPS_KEY_PATH && HTTPS_CERT_PATH) {
  const os = require('os');
  const fs = require('fs');
  const path = require('path');

  const key = fs.readFileSync(
    path.join(
      os.homedir(),
      HTTPS_KEY_PATH,
    ),
    'utf8'
  );
  const cert = fs.readFileSync(
    path.join(
      os.homedir(),
      HTTPS_CERT_PATH,
    ),
    'utf8'
  );

  server = https.createServer({ key, cert }, app);
} else {
  server = http.createServer(app);
}

server.listen(PORT);
console.log(`Server listening on port ${PORT}!`);

// Open app for convenience and to get the initial build started.
if ('development' === NODE_ENV) {
  const openBrowser = require('react-dev-utils/openBrowser');
  openBrowser(rootUrl);
}

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  debug(err);

  if ('production' !== NODE_ENV) {
    throw err;
  }
});
