const getSentryConfig = require('../services/getSentryConfig');

module.exports = {
  '@irvingjs/sentryConfig': getSentryConfig(),
};
