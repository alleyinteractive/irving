const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const {
  postCssConfig,
  transform,
  assetsRoot,
  clientRoot,
} = require('../paths');

const exclude = [/node_modules/, /\.min\.js$/];

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
        /\.svg$/,
        /\.png$/,
        /\.otf$/,
        /\.ico$/,
      ],
      loader: 'url-loader',
      exclude: path.join(assetsRoot, 'icons'),
      options: {
        limit: 10000,
        emitFile: ! isServer,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.svg$/,
      include: path.join(assetsRoot, 'icons'),
      loader: 'svg-react-loader',
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
          issuer: [
            /(fonts|editor)\.js/,
          ],
          use: [
            MiniCSSExtractPlugin.loader,
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
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
                sourceMap: ! isProd,
                localsConvention: 'camelCase',
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
      ],
    },
  ];
};
