const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const getEnv = require('./env');
const { serverBuild, clientBuild, rootUrl } = require('../paths');

/**
 * Get the context specific plugins configuration.
 * @param {string} context - the configuration context
 * @returns {array} - a plugins configuration value
 */
module.exports = function getPlugins(context) {
  const env = getEnv(context);
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
        new webpack.EnvironmentPlugin({
          BROWSER: true,
          ...env,
        }),
        new StatsWriterPlugin(),
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
