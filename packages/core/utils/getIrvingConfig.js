const path = require('path');

/* eslint-disable global-require, import/no-dynamic-require */
module.exports = function getIrvingConfig() {
  return path.join(process.cwd(), 'irving.config.js') || {};
};
/* eslint-enable */
