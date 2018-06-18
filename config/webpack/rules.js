const { nodeModules, postCssConfig } = require('../paths');

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
  const isProd = 'production' === context.includes('production');
  const isServer = 'server' === context.includes('server');
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
      include: nodeModules,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      exclude,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false,
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
    },
  ];
};
