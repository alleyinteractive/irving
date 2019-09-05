/* eslint-disable global-require, no-console */

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const Monitor = require('../services/monitorService');
Monitor().start();

const createDebug = require('../services/createDebug');
const debug = createDebug('server:error');

const http = require('http');
const https = require('https');
const express = require('express');
const { rootUrl } = require('../config/paths');
const getService = require('../services/cacheService');

const {
  PORT = 3001,
  NODE_ENV,
  HTTPS_KEY_PATH,
  HTTPS_CERT_PATH,
} = process.env;
const app = express();

// Bust redis cache for a specific page/post.
app.get('/bust-cache', (req, res) => {
  const { endpoint } = req;
  const cache = getService();

  const hasCache = cache.get(endpoint);
  if (! hasCache) {
    res.json('No cache to bust.');
  }

  // Delete cache.
  cache.del(endpoint);

  // Send message.
  res.json('Cached busted.');
});

// Wipe entire Redis cache.
app.get('/wipe', (req, res) => {
  // Get Cache Service.
  const service = getService();

  // Get Redis object.
  const cache = service.wipe();

  // Create a readable stream (object mode).
  // This approach is better for performance.
  const stream = cache.scanStream({
    // Map all the keys. As we don't know,
    // and save them in a specific pattern.
    match: '*',
  });

  stream.on('data', (keys) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = cache.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    } else {
      res.json('No cache to wipe.');
    }
  });
  stream.on('end', () => {
    res.json('Entire Redis cache wiped out.');
  });
});

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
