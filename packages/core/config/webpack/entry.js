const path = require('path');
const {
  serverRoot,
  clientRoot,
  proxyUrl,
} = require('../paths');
const { maybeResolveUserModule } = require(
  '../../utils/maybeRequireUserModule'
);

/**
 * Get the context specific entry configuration.
 * @param {string} context - the configuration context
 * @returns {string|array|object} - a entry configuration value
 */
module.exports = function getEntry(context) {
  const polyfills = [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'isomorphic-fetch',
  ];
  const server = [
    maybeResolveUserModule('server/renderApp'),
    maybeResolveUserModule('server/renderErrorMessage'),
    serverRoot,
  ];
  const client = [
    path.join(clientRoot),
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
        ...server,
      ];

    case 'production_client':
      return [
        ...polyfills,
        ...client,
      ];

    case 'development_client': {
      let queryString = 'reload=true';
      if (proxyUrl) {
        queryString = `${proxyUrl}&reload=true`;
      }

      return [
        ...polyfills,
        `webpack-hot-middleware/client?${queryString}`,
        ...client,
      ];
    }

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
