const path = require('path');
const defaultConfig = require('config/irving.config.default');

/* eslint-disable global-require, import/no-dynamic-require */
module.exports = function getIrvingConfig() {
  const config = require(
    path.resolve(process.cwd(), 'irving.config.js')
  );

  return {
    ...defaultConfig,
    ...config,
  };
};
/* eslint-enable */
