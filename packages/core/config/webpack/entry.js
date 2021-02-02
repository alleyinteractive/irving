const path = require('path');
const {
  irvingRoot,
  serverRoot,
  clientRoot,
  proxyUrl,
} = require('../paths');
const { getEntries } = require('../multisite');

/**
 * Get the context specific entry configuration.
 *
 * @param {string} context The configuration context
 * @returns {string|array|object} A entry configuration value
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
        ...getEntries(),
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
        ...getEntries(),
      };
    }

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
