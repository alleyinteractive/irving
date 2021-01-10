const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const {
  buildContext,
  irvingRoot,
} = require('../paths');
const { maybeResolveBuildModule } = require('../../utils/userModule');

const include = (filepath) => {
  const matches = (
    (
      (
        (
          // Anything within irving root + build context should be included in build.
          filepath.includes(irvingRoot) ||
          filepath.includes(buildContext) ||
          // Monorepo root directory (if it exists, which it won't outside a development context).
          filepath.includes(path.join(__dirname, '../../../../'))
        ) &&
        ! filepath.includes('node_modules') &&
        ! filepath.includes('shimDom')
      ) ||
      // Anything imported within irving packages should be included in build,
      // even if located within node_modules (but not nested node modules).
      filepath.match(/node_modules\/@irvingjs\/[^/]*\/(?!node_modules)/)
    ) &&
    // Exclude minified JS.
    ! filepath.match(/\.min\.js$/)
  );

  return !! matches;
};

/**
 * Get the context specific rules configuration.
 *
 * @param {string} context The configuration context
 * @param {string} target Webpack bundle target
 * @returns {array} A rules configuration value
 */
module.exports = function getRules(context, target) {
  const isProd = context.includes('production');
  const isServer = context.includes('server');

  return [
    {
      enforce: 'pre',
      test: /\.jsx?$/,
      include,
      use: [
        {
          loader: 'eslint-loader',
          options: {
            configFile: maybeResolveBuildModule('.eslintrc.js'),
          },
        },
      ],
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
      use: [
        {
          loader: 'file-loader',
          options: {
            emitFile: ! isServer,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
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
      use: [
        {
          loader: 'url-loader',
          options: {
            publicPath: '/',
            limit: 10000,
            emitFile: ! isServer,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      include: [/assets\/icons/],
      use: ['@svgr/webpack'],
    },
    {
      test: /\.jsx?$/,
      include: (filepath) => {
        if (
          filepath.includes('node_modules') &&
          'es5' === target &&
          [
            'abort-controller',
            'debug',
            'event-target-shim',
            'query-string',
            'split-on-first',
            'strict-uri-encode',
          ].some(
            (packageName) => filepath.includes(packageName)
          )
        ) {
          return true;
        }

        return include(filepath);
      },
      use: [
        {
          loader: 'babel-loader',
          options: {
            extends: isServer ?
              path.join(irvingRoot, 'babel.config.node.js') :
              path.join(irvingRoot, 'babel.config.web.js'),
            caller: {
              es5: 'es5' === target,
            },
          },
        },
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules\/(?!@irvingjs)/,
      use: [
        MiniCSSExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.css$/,
      include,
      use: [
        MiniCSSExtractPlugin.loader,
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
