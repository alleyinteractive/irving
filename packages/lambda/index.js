/* eslint-disable global-require */
if (process.env.BUILD) {
  module.exports = require('./irving.config.server.js');
}
/* eslint-enable */
