const webpack = require('webpack');
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { maybeResolveUserModule } = require('../../utils/userModule');
const getEnv = require('../env');
const { rootUrl } = require('../paths');

/**
 * Get the context specific plugins configuration.
 * @param {string} context - the configuration context
 * @returns {array} - a plugins configuration value
 */
module.exports = function getPlugins(context) {
  const env = getEnv();

  // Define paths to app and error templates at compile time because express needs paths, not the template module itself.
  // This allows user to more deeply customize app and error templates.
  const commonPlugins = [
    new webpack.DefinePlugin({
      appView: JSON.stringify(maybeResolveUserModule('server/views/app.ejs')),
      errorView: JSON.stringify(
        maybeResolveUserModule('server/views/error.ejs')
      ),
    }),
  ];

  switch (context) {
    case 'production_server':
      return [
        ...commonPlugins,
        new CleanPlugin(),
        new webpack.EnvironmentPlugin({
          WEBPACK_BUILD: true,
          ...env,
        }),
        // Ensures async components can be rendered sync server-side.
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        new webpack.HashedModuleIdsPlugin(),
        // new MiniCSSExtractPlugin({
        //   filename: '[name].[hash].css',
        //   chunkFilename: '[id].[hash].css',
        // }),
      ];

    case 'development_server':
      return [
        ...commonPlugins,
        new webpack.EnvironmentPlugin({
          WEBPACK_BUILD: true,
          ...env,
        }),
        // Ensures async components can be rendered sync server-side.
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        // new MiniCSSExtractPlugin({
        //   filename: '[name].css',
        //   chunkFilename: '[id].css',
        // }),
      ];

    case 'production_client':
      return [
        ...commonPlugins,
        new CleanPlugin(),
        new webpack.EnvironmentPlugin({
          WEBPACK_BUILD: true,
          BROWSER: true,
          ...env,
        }),
        new StatsWriterPlugin({
          stats: {
            all: false,
            assets: true,
            outputPath: true,
            publicPath: true,
          },
        }),
        // Support friendly stack traces for error reporting, but protect
        // source code from being exposed.
        new webpack.SourceMapDevToolPlugin({
          filename: 'static/js/[name].[chunkhash:8].map',
          noSources: true,
          publicPath: `${rootUrl}/`,
        }),
        // new MiniCSSExtractPlugin({
        //   filename: '[name].[hash].css',
        //   chunkFilename: '[id].[hash].css',
        // }),
      ];

    case 'development_client':
      return [
        ...commonPlugins,
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
          WEBPACK_BUILD: true,
          BROWSER: true,
          ...env,
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new MiniCSSExtractPlugin({
        //   filename: '[name].css',
        //   chunkFilename: '[id].css',
        // }),
      ];

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
