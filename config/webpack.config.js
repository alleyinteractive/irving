const nodeExternals = require('webpack-node-externals');
const getConfig = require('./webpack');

module.exports = (env, argv) => {
  const server = getConfig(argv.mode, 'server');
  const client = getConfig(argv.mode, 'client');
  return [
    {
      name: 'client',
      mode: 'production',
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
          minChunks: 2,
        },
        runtimeChunk: true,
      },
    },
    {
      name: 'server',
      mode: 'production',
      devtool: 'sourcemap',
      target: 'node',
      // Quiet bundle size errors, as they are not applicable for code executed in NodeJS.
      performance: {
        hints: false,
      },
      externals: [nodeExternals({
        whitelist: [/\.css$/],
      })],
      entry: server.getEntry(),
      output: server.getOutput(),
      module: {
        rules: server.getRules(),
      },
      plugins: server.getPlugins(),
    },
  ];
};
