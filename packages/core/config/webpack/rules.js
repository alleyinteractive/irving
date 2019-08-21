const path = require('path');
const {
  transform,
  assetsRoot,
  appRoot,
  irvingRoot,
} = require('../paths');
const include = (filepath) => {
  const matches = (
    (
      filepath.includes(irvingRoot) ||
      filepath.includes(appRoot) ||
      (! filepath.includes(irvingRoot) && ! filepath.match(/node_modules/))
    ) &&
    ! filepath.match(/\.min\.js$/)
  );
  if (filepath.includes('hot-loader')) {
    // console.log(filepath, matches);
  }

  return matches;
};

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
      use: {
        loader: 'eslint-loader',
        options: {
          configFile: path.join(irvingRoot, '.eslintrc.js'),
          eslintPath: path.join(appRoot, 'node_modules/eslint'),
        },
      },
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
        loader: 'file-loader',
        options: {
          emitFile: ! isServer,
          name: 'static/media/[name].[hash:8].[ext]',
        },
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
      exclude: path.join(assetsRoot, 'icons'),
      use: {
        loader: 'url-loader',
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
      use: 'svg-react-loader',
    },
    {
      test: /\.jsx?$/,
      include,
      use: {
        loader: 'babel-loader',
        options: require(path.join(irvingRoot, 'babel.config.js')),
      },
    },
    {
      test: /\.css$/,
      include,
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
      ],
    },
  ];
};
