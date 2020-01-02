const memoize = require('lodash/memoize');
const { getMergedFromUserConfig } = require('./getMergedConfigField');
let config;

/* eslint-disable import/no-dynamic-require, global-require */
if (process.env.BUILD) {
  config = require('@irvingjs/irving.config').default || {};
} else {
  const { serverConfig: serverConfigPath } = require('../config/paths');

  // Wrap require for server config in try/catch to ensure things will work
  // if user decides not to create a server config.
  try {
    config = require(serverConfigPath) || {};
  } catch (e) {
    config = {};
  }
}
/* eslint-enable */

// getMergedFromUserConfig is expensive, so export a function that memoizes the results.
module.exports = memoize((key) => getMergedFromUserConfig(config, key));
