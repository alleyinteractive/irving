const {
  postCssConfig,
  transform,
  assetsRoot,
  clientRoot,
} = require('../paths');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const exclude = [
  /node_modules/,
  /\.min\.js$/,
];

/**
 * Get the context specific rules configuration.
 * @param {string} context - the configuration context
 * @returns {array} - a rules configuration value
 */
module.exports = function getRules(context) {
  const isProd = context.includes('production');
  const isServer = context.includes('server');
  return [
    {
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude,
      use: 'eslint-loader',
    },
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.svg$/,
        /\.otf$/,
        /\.ico$/,
      ],
      loader: 'file-loader',
      options: {
        emitFile: ! isServer,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
    {
      test: [
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.svg$/,
        /\.otf$/,
        /\.ico$/,
      ],
      loader: 'url-loader',
      options: {
        limit: 10000,
        emitFile: ! isServer,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.jsx?$/,
      exclude,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: ! isProd,
        },
      },
    },
    {
      test: /\.css$/,
      exclude,
      oneOf: [
        {
          issuer: path.join(clientRoot, 'editor.js'),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: true,
                importLoaders: 1,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: ! isProd,
                config: {
                  path: postCssConfig,
                },
              },
            },
          ],
        },
        {
          use: [
            {
              loader: isServer ? 'critical-style-loader' : 'style-loader',
              options: {
                transform,
              },
            },
            {
              loader: 'css-loader',
              options: {
                url: true,
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                minimize: isProd,
                sourceMap: ! isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: ! isProd,
                config: {
                  path: postCssConfig,
                },
              },
            },
          ],
        }
      ],
    },
  ];
};
