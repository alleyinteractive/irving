/* eslint-disable global-require, no-console */

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const getService = require('../services/monitorService');
getService().start();

const createDebug = require('../services/createDebug');
const debug = createDebug('server:error');

const express = require('express');
const { PORT = 3001, NODE_ENV } = process.env;
const app = express();

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

// Handle uncaught promise exceptions.
process.on('unhandledRejection', (err) => {
  debug(err);

  if ('production' !== process.env.NODE_ENV) {
    throw err;
  }
});
