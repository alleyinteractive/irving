const path = require('path');
const { serverRoot, clientRoot } = require('../paths');

/**
 * Get the context specific entry configuration.
 * @param {string} context - the configuration context
 * @returns {string|array|object} - a entry configuration value
 */
module.exports = function getEntry(context) {
  const polyfills = ['babel-polyfill', 'isomorphic-fetch'];
  switch (context) {
    case 'production_server':
    case 'development_server':
      return [
        // @todo: Upgrade to babel 7.0 to obtain access to .babelrc.js support,
        // so that the env preset can be dynamically configured to independently
        // target NodeJS and browser environments, thus eliminating the need to
        // require babel-polyfill for NodeJS.
        ...polyfills,
        serverRoot,
      ];

    case 'production_client':
      return {
        main: [
          ...polyfills,
          path.join(clientRoot),
        ],
        // Entry point for WordPress editor styles
        editor: path.join(clientRoot, 'editor.js'),
      };

    case 'development_client':
      return {
        main: [
          ...polyfills,
          'webpack-hot-middleware/client?reload=true',
          path.join(clientRoot),
        ],
        // Entry point for WordPress editor styles
        editor: path.join(clientRoot, 'editor.js'),
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
