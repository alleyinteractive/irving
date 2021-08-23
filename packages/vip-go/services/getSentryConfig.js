const path = require('path');
const resolveConfigFilepath = require('@irvingjs/core/config/irving/resolveConfigFilepath');

/**
 * Utility function to get the Sentry config from the Irving app
 * or fall back to a default config.
 *
 * @returns {object} A Sentry config object.
 */
const getSentryConfig = () => {
  let sentryConfig = resolveConfigFilepath('sentry.config.js');
  if (!sentryConfig) {
    sentryConfig = path.join(
      __dirname,
      '../sentry.config.js',
    );
  }

  return sentryConfig;
};

module.exports = getSentryConfig;
