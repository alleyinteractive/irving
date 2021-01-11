const path = require('path');
const {
  irvingRoot,
  serverRoot,
  clientRoot,
  proxyUrl,
} = require('../paths');

/**
 * Get the context specific entry configuration.
 *
 * @param {string} context The configuration context
 * @param {string} target Webpack bundle target
 * @returns {string|array|object} A entry configuration value
 */
module.exports = function getEntry(context, target) {
  const polyfills = [
    'regenerator-runtime/runtime',
    'abort-controller/polyfill',
  ];
  const clientPolyfills = 'es5' === target ? [
    ...polyfills,
    'whatwg-fetch',
    path.join(irvingRoot, 'utils/eventSource'),
  ] : [];
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
