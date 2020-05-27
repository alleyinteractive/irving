const serverless = require('serverless-http');
const app = require('@irvingjs/core/server');

module.exports = serverless(app);
