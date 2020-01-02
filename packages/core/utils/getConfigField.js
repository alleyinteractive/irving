const memoize = require('lodash/memoize');
const { getMergedFromUserConfig } = require('./getMergedConfigField');
let config;

/* eslint-disable import/no-dynamic-require, global-require */
// Wrap require for configs in try/catch to ensure things will work if user only needs a componentMap.js
if (process.env.BUILD) {
  try {
    config = require('@irvingjs/irving.config').default;
  } catch (e) {
    config = {};
  }
} else {
  const { serverConfig: serverConfigPath } = require('../config/paths');

  try {
    config = require(serverConfigPath);
  } catch (e) {
    config = {};
  }
}
/* eslint-enable */

// getMergedFromUserConfig is expensive, so export a function that memoizes the results.
module.exports = memoize((key) => getMergedFromUserConfig(config, key));
