const memoize = require('lodash/memoize');
const { getMergedFromUserConfig } = require('./getMergedConfigField');
let config;

/* eslint-disable import/no-dynamic-require, global-require */
if (process.env.BUILD) {
  config = require('@irvingjs/irving.config').default || {};
} else {
  const { serverConfig: serverConfigPath } = require('../config/paths');
  const chalk = require('chalk');

  // Wrap require for server config in try/catch to ensure things will work
  // if user decides not to create a server config.
  try {
    config = require(serverConfigPath) || {};
  } catch (e) {
    if (
      'MODULE_NOT_FOUND' === e.code &&
      e.toString().includes('irving.config.server.js')
    ) {
      // Server config missing, which is ok (but user should still be notified.)
      console.log( // eslint-disable-line no-console
        chalk.yellow('No Irving server config found, continuing with defaults.')
      );
      config = {};
    } else {
      // Something is wrong inside the server config, stop the current process.
      throw new Error(chalk.red(e));
    }
  }
}
/* eslint-enable */

// getMergedFromUserConfig is expensive, so export a function that memoizes the results.
module.exports = memoize((key) => getMergedFromUserConfig(config, key));
