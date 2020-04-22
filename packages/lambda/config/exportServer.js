/* eslint-disable global-require, no-console, import/order */
const serverless = require('serverless-http');
const app = require('@irvingjs/core/server');

module.exports.handler = serverless(app);
