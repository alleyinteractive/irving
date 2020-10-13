const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  plugins: [
    new LoadablePlugin({
      outputAsset: false,
      writeToDisk: false,
    }),
  ],
};
