const path = require('path');
const { serverRoot, clientRoot } = require('../paths');

/**
 * Get the context specific entry configuration.
 * @param {string} context - the configuration context
 * @returns {string|array|object} - a entry configuration value
 */
module.exports = function getEntry(context) {
  switch (context) {
    case 'production_server':
    case 'development_server':
      return serverRoot;

    case 'production_client':
      return [
        'babel-polyfill',
        'isomorphic-fetch',
        path.join(clientRoot),
      ];

    case 'development_client':
      return [
        'babel-polyfill',
        'isomorphic-fetch',
        'webpack-hot-middleware/client',
        path.join(clientRoot),
      ];

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
