const path = require('path');
const {
  transform,
  assetsRoot,
  irvingRoot,
} = require('../paths');
const include = (filepath) => (
  filepath.includes(irvingRoot) &&
  ! filepath.match(/node_modules/)
);

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
      include,
      use: require.resolve('eslint-loader'),
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
      use: {
        loader: require.resolve('file-loader'),
        options: {
          emitFile: ! isServer,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }
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
      exclude: path.join(assetsRoot, 'icons'),
      use: {
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          emitFile: ! isServer,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    },
    {
      test: /\.svg$/,
      include: path.join(assetsRoot, 'icons'),
      use: require.resolve('svg-react-loader'),
    },
    {
      test: /\.jsx?$/,
      include,
      use: {
        loader: require.resolve('babel-loader'),
        options: require(path.join(irvingRoot, 'babel.config.js')),
      },
    },
    {
      test: /\.css$/,
      include,
      use: [
        {
          loader: isServer ? require.resolve('critical-style-loader') :
            require.resolve('style-loader'),
          options: {
            transform,
          },
        },
        {
          loader: require.resolve('css-loader'),
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
      ],
    },
  ];
};
