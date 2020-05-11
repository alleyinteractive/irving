const path = require('path');
const { appRoot } = require('../paths');

/**
 * Get the context specific alias configuration.
 * @param {string} context - the configuration context
 * @returns {object} - an alias configuration value.
 */
module.exports = function getAlias(context) {
  switch (context) {
    case 'development_server':
    case 'production_server':
      return {};

    case 'development_client':
      // Use the app version of these packages to prevent duplicate react errors with npm link
      return {
        'react-dom': path.join(appRoot, './node_modules/@hot-loader/react-dom'),
        react: path.join(appRoot, './node_modules/react'),
        'react-redux': path.join(appRoot, './node_modules/react-redux'),
      };

    case 'production_client':
      return {};

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
