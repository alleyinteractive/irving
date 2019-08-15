const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getEnv = require('./env');
const { rootUrl } = require('../paths');

/**
 * Get the context specific plugins configuration.
 * @param {string} context - the configuration context
 * @returns {array} - a plugins configuration value
 */
module.exports = function getPlugins(context) {
  const env = getEnv();
  switch (context) {
    case 'production_server':
      return [
        new CleanPlugin(),
        // Ensures async components can be rendered sync server-side.
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        new webpack.HashedModuleIdsPlugin(),
      ];

    case 'development_server':
      return [
        // Ensures async components can be rendered sync server-side.
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ];

    case 'production_client':
      return [
        new CaseSensitivePathsPlugin(),
        new CleanPlugin(),
        new webpack.EnvironmentPlugin({
          BROWSER: true,
          ...env,
        }),
        new StatsWriterPlugin({
          fields: ['assetsByChunkName', 'publicPath', 'outputPath'],
        }),
        // Support friendly stack traces for error reporting, but protect
        // source code from being exposed.
        new webpack.SourceMapDevToolPlugin({
          filename: 'static/js/[name].[chunkhash:8].map',
          noSources: true,
          publicPath: `${rootUrl}/`,
        }),
      ];

    case 'development_client':
      return [
        new CaseSensitivePathsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
          BROWSER: true,
          ...env,
        }),
      ];

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
