const nodeExternals = require('webpack-node-externals');
const getConfigService = require('./webpack');

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProd = 'production' === mode;
  const server = getConfigService(mode, 'server');
  const client = getConfigService(mode, 'client');
  return [
    {
      name: 'client',
      mode,
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
      name: 'server',
      mode,
      devtool: server.getDevTool(),
      target: 'node',
      // Quiet bundle size errors, as they are not applicable for code executed in NodeJS.
      performance: {
        hints: false,
      },
      // Don't polyfill NodeJS APIs, as we require a LTS NodeJS environment.
      node: false,
      // Allow references to vendor css, so we can include them in our bundle.
      externals: [nodeExternals({
        whitelist: [/\.css$/],
      })],
      entry: server.getEntry(),
      output: server.getOutput(),
      module: {
        rules: server.getRules(),
      },
      plugins: server.getPlugins(),
      optimization: {
        // This keeps the emitted code readable if we want to read it.
        // Minimization isn't useful for NodeJS anyways.
        minimize: false,
      },
    },
  ];
};
