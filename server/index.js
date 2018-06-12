/* eslint-disable global-require, no-console */

// Support isomorphic environment variables from local .env file
require('dotenv').config();

// Shim window global and browser matchMedia API
require('../utils/shimWindow');

const path = require('path');
const express = require('express');
const { PORT = 3001, NODE_ENV } = process.env;
const app = express();

app.set('views', path.resolve('./src/server/views'));
app.set('view engine', 'ejs');

if ('development' === NODE_ENV) {
  require('./dev')(app);
} else {
  require('./prod')(app);
}

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

process.on('unhandledRejection', (err) => {
  console.error(err);

  if ('production' !== process.env.NODE_ENV) {
    throw err;
  }
});
