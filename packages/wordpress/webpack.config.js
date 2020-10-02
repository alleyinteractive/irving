const path = require('path');
const { clientBuild, rootUrl } = require('@irvingjs/core/config/paths');

/**
 * Webpack config for producing block editor JS file for enqueueing in WP admin.
 */
module.exports = {
  entry: {
    blockEditor: path.join(__dirname, './blockEditor.js'),
  },
  mode: 'production',
  devtool: 'source-map',

  // Define module outputs
  output: {
    path: clientBuild,
    publicPath: `${rootUrl}/`,
    filename: '[name].js',
    chunkFilename: '[name].js',
    jsonpFunction: 'irvingEditorJsonp',
  },

  externals: {
    jquery: 'jQuery',
    react: 'React',
    'react-dom': 'ReactDOM',
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
