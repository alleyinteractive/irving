/* eslint-disable */
const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const CleanPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { serverBuild, clientBuild, rootUrl } = require('../paths');

module.exports = (mode, opEnv) => {
  switch (`${mode}_${opEnv}`) {
    case 'production_server':
      return [
        new CleanPlugin(serverBuild, { allowExternal: true }),
      ];

    case 'development_server':
      return [];

    case 'production_client':
      return [
        new CleanPlugin(clientBuild, { allowExternal: true }),
        new DotenvPlugin(),
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
        new DotenvPlugin(),
      ];

    default:
      throw new Error('Unknown configuration environment');
  }
};
