const { nodeModules, appRoot, postCssConfig } = require('../paths');

const exclude = [
  /node_modules/,
  /\.min\.js$/,
];

module.exports = (mode, opEnv) => {
  const isProd = 'production' === mode;
  const isServer = 'server' === opEnv;
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
      use: 'babel-loader',
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
      include: appRoot,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
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
