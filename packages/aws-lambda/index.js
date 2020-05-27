/* eslint-disable global-require */

if (process.env.WEBPACK_BUILD) {
  module.exports = require('./irving.config.server.js');
}
/* eslint-enable */
