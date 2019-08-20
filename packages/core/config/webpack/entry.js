const path = require('path');
const { serverRoot, clientRoot, proxyUrl } = require('../paths');

/**
 * Get the context specific entry configuration.
 * @param {string} context - the configuration context
 * @returns {string|array|object} - a entry configuration value
 */
module.exports = function getEntry(context) {
  const polyfills = [
    require.resolve('core-js/stable'),
    require.resolve('regenerator-runtime/runtime'),
    require.resolve('isomorphic-fetch'),
  ];

  switch (context) {
    case 'production_server':
    case 'development_server':
      return [
        // @todo: Upgrade to babel 7.0 to obtain access to .babelrc.js support,
        // so that the env preset can be dynamically configured to independently
        // target NodeJS and browser environments, thus eliminating the need to
        // require babel-polyfill for NodeJS.
        ...polyfills,
        './irving.config.js',
        serverRoot,
      ];

    case 'production_client':
      return [
        ...polyfills,
        './irving.config.js',
        path.join(clientRoot),
      ];

    case 'development_client': {
      let queryString = 'reload=true';
      if (proxyUrl) {
        queryString = `${proxyUrl}&reload=true`;
      }

      return [
        ...polyfills,
        `${require.resolve('webpack-hot-middleware/client')}?${queryString}`,
        './irving.config.js',
        path.join(clientRoot),
      ];
    }

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
