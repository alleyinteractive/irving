const { serverBuild, clientBuild, rootUrl } = require('../paths');

/**
 * Get the context specific output configuration.
 *
 * @param {string} context The configuration context
 * @returns {object} An output configuration value
 */
module.exports = function getOutput(context) {
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
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        jsonpFunction: 'irvingWebpackJsonp',
      };

    case 'development_client':
      return {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        jsonpFunction: 'irvingWebpackJsonp',
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
