const path = require('path');
const resolveConfigFilepath = require('@irvingjs/core/config/irving/resolveConfigFilepath');

/**
 * Get the Sentry config.
 */
let sentryConfig = resolveConfigFilepath('sentry.config.js');
if (!sentryConfig) {
  sentryConfig = path.join(
    __dirname,
    'sentry.config.js',
  );
}

module.exports = {
  '@irvingjs/config/sentryConfig': sentryConfig,
};
