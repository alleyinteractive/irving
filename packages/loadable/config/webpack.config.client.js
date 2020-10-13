const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  plugins: [
    new LoadablePlugin({
      filename: 'loadable-stats.json',
      writeToDisk: true,
    }),
  ],
};
