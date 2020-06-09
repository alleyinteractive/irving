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
        ) && ! filepath.includes('node_modules')
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
 * @param {string} context - the configuration context
 * @returns {array} - a rules configuration value
 */
module.exports = function getRules(context) {
  const isProd = context.includes('production');
  const isServer = context.includes('server');

  const cssLoader = {
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
  };

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
      use: ['svg-react-loader'],
    },
    {
      resource: {
        test: /\.jsx?$/,
        or: [
          include,
          (filepath) => (
            // These specific node modules, which contain arrow functions that must be
            // transpiled.
            filepath.includes('node_modules') &&
              (
                filepath.includes('query-string') ||
                filepath.includes('split-on-first') ||
                filepath.includes('strict-uri-encode') ||
                filepath.includes('abort-controller') ||
                filepath.includes('event-target-shim')
              )
          ),
        ],
      },
      use: [
        {
          loader: 'babel-loader',
          options: {
            extends: path.join(irvingRoot, 'babel.config.js'),
          },
        },
      ],
    },
    {
      test: /\.css$/,
      include,
      use: isServer ? [
        'critical-style-loader',
        cssLoader,
      ] : [
        // {
        //   loader: MiniCSSExtractPlugin.loader,
        //   options: {
        //     hmr: ! isProd,
        //   },
        // },
        // 'style-loader',
        'style-loader',
        'critical-style-loader',
        cssLoader,
      ],
    },
  ];
};
