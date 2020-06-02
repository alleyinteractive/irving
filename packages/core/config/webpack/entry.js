const path = require('path');
const {
  irvingRoot,
  serverRoot,
  clientRoot,
  proxyUrl,
} = require('../paths');

/**
 * Get the context specific entry configuration.
 * @param {string} context - the configuration context
 * @returns {string|array|object} - a entry configuration value
 */
module.exports = function getEntry(context) {
  const polyfills = [
    'regenerator-runtime/runtime',
    'abort-controller/polyfill',
  ];
  const clientPolyfills = [
    ...polyfills,
    'whatwg-fetch',
  ];
  const serverPolyfills = [
    ...polyfills,
    path.join(irvingRoot, 'utils/isomorphicFetch'),
  ];

  switch (context) {
    case 'development_server':
    case 'production_server':
      return {
        main: [
          ...serverPolyfills,
          serverRoot,
        ],
      };

    case 'production_client':
      return {
        main: [
          ...clientPolyfills,
          clientRoot,
        ],
      };

    case 'development_client': {
      let queryString = 'reload=true';
      if (proxyUrl) {
        queryString = `${proxyUrl}&reload=true`;
      }

      return {
        main: [
          ...clientPolyfills,
          `webpack-hot-middleware/client?${queryString}`,
          clientRoot,
        ],
      };
    }

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
