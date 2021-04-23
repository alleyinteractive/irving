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
      return {
        path: serverBuild,
        publicPath: `${rootUrl}/`,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
        assetModuleFilename: 'static/media/[name].[contenthash:8][ext]',
      };

    case 'development_server':
      return {
        path: serverBuild,
        publicPath: `${rootUrl}/`,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
        assetModuleFilename: 'static/media/[name][ext]',
      };

    case 'production_client':
      return {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        assetModuleFilename: 'static/media/[name].[contenthash:8][ext]',
      };

    case 'development_client':
      return {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        assetModuleFilename: 'static/media/[name][ext]',
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
