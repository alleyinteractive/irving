const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const CleanPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { serverBuild, clientBuild, rootUrl } = require('../paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Get the context specific plugins configuration.
 * @param {string} context - the configuration context
 * @returns {array} - a plugins configuration value
 */
module.exports = function getPlugins(context) {
  switch (context) {
    case 'production_server':
      return [
        new CleanPlugin(serverBuild, { allowExternal: true }),
      ];

    case 'development_server':
      return [];

    case 'production_client':
      return [
        new CleanPlugin(clientBuild, { allowExternal: true }),
        new DotenvPlugin({
          systemvars: true,
        }),
        new webpack.EnvironmentPlugin({
          BROWSER: true,
        }),
        new StatsWriterPlugin(),
        // Support friendly stack traces for error reporting, but protect
        // source code from being exposed.
        new webpack.SourceMapDevToolPlugin({
          filename: 'static/js/[name].[chunkhash:8].map',
          noSources: true,
          publicPath: `${rootUrl}/`,
        }),
        new MiniCssExtractPlugin({ filename: 'static/css/[name].css' }),
      ];

    case 'development_client':
      return [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DotenvPlugin(),
        new webpack.EnvironmentPlugin({
          BROWSER: true,
        }),
        new MiniCssExtractPlugin({ filename: 'static/css/[name].css' }),
      ];

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
