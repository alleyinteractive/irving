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
    'core-js/stable',
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
    case 'production_server':
    case 'development_server':
      return {
        main: [
          // @todo: Upgrade to babel 7.0 to obtain access to .babelrc.js support,
          // so that the env preset can be dynamically configured to independently
          // target NodeJS and browser environments, thus eliminating the need to
          // require babel-polyfill for NodeJS.
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
