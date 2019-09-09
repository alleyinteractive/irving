const path = require('path');
const nodeExternals = require('webpack-node-externals');
const getConfigService = require('./webpack');
const { appRoot } = require('./paths');

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProd = 'production' === mode;
  const server = getConfigService(mode, 'server');
  const client = getConfigService(mode, 'client');

  return [
    {
      context: appRoot,
      name: 'client',
      mode,
      resolve: {
        alias: client.getAlias(),
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
      context: appRoot,
      name: 'server',
      mode,
      devtool: server.getDevTool(),
      target: 'node',
      resolve: {
        alias: server.getAlias(),
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
      ],
      entry: server.getEntry(),
      output: server.getOutput(),
      module: {
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
};
