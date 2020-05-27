const memoize = require('lodash/memoize');
const { getMergedFromUserConfig } = require('./getMergedConfigField');
let config;

/* eslint-disable import/no-dynamic-require, global-require */
if (
  'development_client' === process.env.IRVING_EXECUTION_CONTEXT ||
  'production_client' === process.env.IRVING_EXECUTION_CONTEXT
) {
  config = require('@irvingjs/irving.config').default || {};
} else if ('test' === process.env.BABEL_ENV) {
  config = require('../irving.config.js');
} else {
  const { maybeResolveBuildModule } = require('./userModule');
  config = require(maybeResolveBuildModule('irving.config.js'));
}
/* eslint-enable */

// getMergedFromUserConfig is expensive, so export a function that memoizes the results.
module.exports = memoize((key) => getMergedFromUserConfig(config, key));
