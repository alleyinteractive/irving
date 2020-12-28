const { serverBuild, clientBuild, rootUrl } = require('../paths');

/**
 * Get the context specific output configuration.
 *
 * @param {string} context The configuration context
 * @returns {object} An output configuration value
 */
module.exports = function getOutput(context, target) {
  const clientPrefix = '.es5' === target ? 'es5' : '';

  switch (context) {
    case 'production_server':
    case 'development_server':
      return {
        path: serverBuild,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
      };

    case 'production_client':
      return {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: `static/js/[name].[chunkhash:8]${clientPrefix}.bundle.js`,
        chunkFilename:
          `static/js/[name].[chunkhash:8]${clientPrefix}.chunk.js`,
        jsonpFunction: 'irvingWebpackJsonp',
      };

    case 'development_client':
      return {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: `[name]${clientPrefix}.bundle.js`,
        chunkFilename: `[name]${clientPrefix}.chunk.js`,
        jsonpFunction: 'irvingWebpackJsonp',
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
