const path = require('path');
const { appRoot } = require('../paths');

/**
 * Get the context specific alias configuration.
 *
 * @param {string} context The configuration context
 * @param {string} target Webpack bundle target
 * @returns {object} An alias configuration value.
 */
module.exports = function getAlias(context, target) {
  let alias;

  switch (context) {
    case 'development_server':
    case 'production_server':
      return {};

    case 'development_client':
    case 'production_client':
      // Use the app version of these packages to prevent duplicate react errors with npm link
      alias = {
        'react-dom': path.join(appRoot, './node_modules/react-dom'),
        react: path.join(appRoot, './node_modules/react'),
        'react-redux': path.join(appRoot, './node_modules/react-redux'),
        'prop-types': path.join(appRoot, './node_modules/prop-types'),
        'styled-components': path.join(
          appRoot,
          './node_modules/styled-components'
        ),
      };

      // ie11-specific aliases.
      if ('es5' === target) {
        return {
          ...alias,
          'react-hook-form': path.join(
            appRoot,
            './node_modules/react-hook-form/dist/index.ie11.js'
          ),
        };
      }

      return alias;

    // case 'production_client':
    //   return {};

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
