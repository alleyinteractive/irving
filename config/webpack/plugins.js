const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const CleanPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { serverBuild, appBuild } = require('../paths');

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
        new CleanPlugin(appBuild, { allowExternal: true }),
        new DotenvPlugin(),
        new StatsWriterPlugin(),
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
