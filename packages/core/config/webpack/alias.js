const path = require('path');
const { appRoot } = require('../paths');

/**
 * Get the context specific alias configuration.
 *
 * @param {string} context The configuration context
 * @returns {object} An alias configuration value.
 */
module.exports = function getAlias(context) {
  switch (context) {
    case 'development_server':
    case 'production_server':
      return {
        canvas: path.join(__dirname, '../../utils/shimCanvas.js'),
      };

    case 'development_client':
      // Use the app version of these packages to prevent duplicate react errors with npm link
      return {
        'react-dom': path.join(appRoot, './node_modules/react-dom'),
        react: path.join(appRoot, './node_modules/react'),
        'react-redux': path.join(appRoot, './node_modules/react-redux'),
        redux: path.join(appRoot, './node_modules/redux'),
        'prop-types': path.join(appRoot, './node_modules/prop-types'),
        'styled-components': path.join(
          appRoot,
          './node_modules/styled-components',
        ),
        webpack: path.join(appRoot, './node_modules/webpack'),
      };

    case 'production_client':
      return {};

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
