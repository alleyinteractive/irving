/* eslint-disable global-require */

if (! process.env.WEBPACK_BUILD) {
  module.exports = require('./irving.config.server.js');
} else {
  module.exports = require('./irving.config.js');
}
/* eslint-enable */
