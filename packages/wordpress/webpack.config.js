const path = require('path');

/**
 * Webpack config for producing block editor JS file for enqueueing in WP admin.
 */
module.exports = {
  entry: {
    editor: path.join(__dirname, './blockEditor.js'),
  },
  mode: 'production',
  devtool: 'source-map',

  // Define module outputs
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath: themePath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  externals: {
    jquery: 'jQuery',
    react: 'React',
  },

  // Loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.min\.js$/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            extends: path.join(__dirname, 'babel.config.js'),
          },
        },
      },
    ],
  },
};
