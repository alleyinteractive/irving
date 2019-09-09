const path = require('path');
const {
  transform,
  appRoot,
  irvingRoot,
  postCssConfig,
} = require('../paths');
const include = (filepath) => {
  const matches = (
    (
      (
        (
          // Anything within irving root + app root should be included in build.
          filepath.includes(irvingRoot) ||
          filepath.includes(appRoot) ||
          // monorepo root directory (if it exists, which it won't outside a development context).
          filepath.includes(path.join(__dirname, '../../../../'))
        ) && ! filepath.includes('node_modules')
      ) ||
      // Anything within irving repos should be included in build, even if located within node_modules.
      filepath.match(/node_modules\/@irvingjs/)
    ) &&
    // Exclude minified JS.
    ! filepath.match(/\.min\.js$/)
  );

  return !! matches;
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
      exclude: [/assets\/icons/],
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
      include: [/assets\/icons/],
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
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: postCssConfig,
            },
          },
        },
      ],
    },
  ];
};
