if (! process.env.WEBPACK_BUILD) {
  module.exports = require('./irving.config.server.js'); // eslint-disable-line global-require
} else {
  module.exports = require('./irving.config.js'); // eslint-disable-line global-require
}
