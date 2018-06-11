const nodeExternals = require('webpack-node-externals');
const getConfig = require('./webpack');

module.exports = (env, argv) => {
  const server = getConfig(argv.mode, 'server');
  const browser = getConfig(argv.mode, 'browser');
  return [
    {
      name: 'client',
      mode: 'production',
      entry: browser.getEntry(),
      output: browser.getOutput(),
      module: {
        rules: browser.getRules(),
      },
      plugins: browser.getPlugins(),
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
