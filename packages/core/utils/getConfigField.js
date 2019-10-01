const { getMergedFromUserConfig } = require('./getMergedConfigField');
let config;

/* eslint-disable import/no-dynamic-require, global-require */
if (process.env.BUILD) {
  config = require('@irvingjs/irving.config').default;
} else {
  const { serverConfig: serverConfigPath } = require('../config/paths');
  config = require(serverConfigPath);
}
/* eslint-enable */

module.exports = (key) => getMergedFromUserConfig(config, key);
