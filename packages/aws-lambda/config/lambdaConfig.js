const serverless = require('serverless-http');
// const app = require('@irvingjs/core/server');
const app = require('../../core/server');

module.exports = serverless(app);
