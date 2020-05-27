const nodeExternals = require('webpack-node-externals');
const getConfigService = require('./webpack');
const { buildContext } = require('./paths');
const getConfigField = require('../utils/getConfigField');

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProd = 'production' === mode;
  const server = getConfigService(mode, 'server');
  const client = getConfigService(mode, 'client');
  const extensions = ['.js', '.json'];
  const multiConfig = [
    {
      context: buildContext,
      name: 'client',
      mode,
      resolve: {
        extensions,
        alias: client.getAlias(),
        symlinks: ! isProd,
      },
      devtool: client.getDevTool(),
      entry: client.getEntry(),
      output: client.getOutput(),
      module: {
        rules: client.getRules(),
      },
      plugins: client.getPlugins(),
      optimization: {
        splitChunks: {
          name: 'common',
          chunks: 'all',
        },
        runtimeChunk: isProd,
      },
    },
    {
      context: buildContext,
      name: 'server',
      mode,
      devtool: server.getDevTool(),
      target: 'node',
      resolve: {
        extensions,
        alias: server.getAlias(),
        symlinks: ! isProd,
      },
      // Quiet bundle size errors, as they are not applicable for code executed in NodeJS.
      performance: {
        hints: false,
      },
      // Don't polyfill NodeJS APIs, as we require a LTS NodeJS environment.
      node: false,
      externals: [
        nodeExternals({
          whitelist: [
            // Allow references to vendor css, so we can include them in our bundle.
            /\.css$/,
            /babel-plugin-universal-import/,
            /react-universal-component/,
            /webpack-flush-chunks/,
            // Include other irving packages in node_modules.
            /@irvingjs/,
          ],
        }),
        // fs: 'fs',
        // path: 'path',
        // '@newrelic/native-metrics': '@newrelic/native-metrics',
      ],
      entry: server.getEntry(),
      output: server.getOutput(),
      module: {
        noParse: [/nodeRequire/],
        rules: server.getRules(),
      },
      plugins: server.getPlugins(),
      optimization: {
        // This keeps the emitted code readable if we need to review it manually.
        // Minimization isn't useful for NodeJS anyways.
        minimize: false,
      },
    },
  ];
  const configGetters = getConfigField('webpackConfig');
  // Call all config getters, passing in configs in succession.
  const processedConfigs = configGetters.reduce((acc, getter) => (
    getter(acc, mode)
  ), multiConfig);

  return processedConfigs;
};
