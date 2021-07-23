const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const ReactRefreshWebpackPlugin = require(
  '@pmmmwh/react-refresh-webpack-plugin',
);
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { rootUrl } = require('../paths');
const proxyPassthrough = require('../proxyPassthrough');
const { maybeResolveUserModule } = require('../../utils/userModule');
const eslintConfig = require('../../.eslintrc.js');

/**
 * Get the context specific plugins configuration.
 *
 * @param {string} context The configuration context
 * @param {object} argv CLI arguments.
 * @returns {array} A plugins configuration value
 */
module.exports = function getPlugins(context, argv) {
  const { analyze } = argv;

  // Define paths to app and error templates at compile time because
  // express needs paths, not the template module itself. This allows user to
  // more deeply customize app and error templates.
  const commonPlugins = [
    new webpack.DefinePlugin({
      appView: JSON.stringify(maybeResolveUserModule('server/views/app.ejs')),
      errorView: JSON.stringify(
        maybeResolveUserModule('server/views/error.ejs'),
      ),
      proxyPassthrough: JSON.stringify(proxyPassthrough),
    }),
    new webpack.EnvironmentPlugin({
      IRVING_EXECUTION_CONTEXT: context,
    }),
    new ESLintPlugin({
      baseConfig: eslintConfig,
    }),
  ];

  switch (context) {
    case 'production_server':
      return [
        ...commonPlugins,
        new CleanWebpackPlugin(),
        // Ensures async components can be rendered sync server-side.
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        new MiniCSSExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }),
      ];

    case 'development_server':
      return [
        ...commonPlugins,
        // Ensures async components can be rendered sync server-side.
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        new MiniCSSExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ];

    case 'production_client':
      return [
        ...commonPlugins,
        new CleanWebpackPlugin(),
        new StatsWriterPlugin({
          stats: {
            all: false,
            assets: true,
            hash: true,
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
        new MiniCSSExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }),
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
        (analyze && new BundleAnalyzerPlugin()),
      ].filter(Boolean);

    case 'development_client':
      return [
        ...commonPlugins,
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockIntegration: 'whm',
          },
        }),
        new MiniCSSExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
      ];

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};

module.exports.MiniCSSExtractPlugin = MiniCSSExtractPlugin;
