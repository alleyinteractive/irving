const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const {
  buildContext,
  irvingRoot,
} = require('../paths');

const include = (filepath) => {
  const matches = (
    (
      (
        (
          // Anything within irving root + build context should be included in build.
          filepath.includes(irvingRoot)
          || filepath.includes(buildContext)
          // Monorepo root directory (if it exists, which it won't outside a development context).
          || filepath.includes(path.join(__dirname, '../../../../'))
        )
        && !filepath.includes('node_modules')
        && !filepath.includes('shimDom')
      )
      // Anything imported within irving packages should be included in build,
      // even if located within node_modules (but not nested node modules).
      || filepath.match(/node_modules\/@irvingjs\/[^/]*\/(?!node_modules)/)
    )
    // Exclude minified JS.
    && !filepath.match(/\.min\.js$/)
  );

  return !!matches;
};

/**
 * Get the context specific rules configuration.
 *
 * @param {string} context The configuration context
 * @returns {array} A rules configuration value
 */
module.exports = function getRules(context) {
  const isProd = context.includes('production');
  const isServer = context.includes('server');

  return [
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx|mjs)$/,
        /\.css$/,
        /\.s[ac]ss$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.otf$/,
        /\.ico$/,
        /\.svg$/,
      ],
      type: 'asset/resource',
      generator: {
        emit: !isServer,
      },
    },
    {
      test: [
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.otf$/,
        /\.ico$/,
        /\.svg$/,
      ],
      exclude: [/assets\/icons/],
      type: 'asset',
      generator: {
        emit: !isServer,
      },
    },
    {
      test: /\.svg$/,
      include: [/assets\/icons/],
      use: ['@svgr/webpack'],
    },
    {
      test: /\.jsx?$/,
      include,
      use: [
        {
          loader: 'babel-loader',
          options: {
            extends: isServer
              ? path.join(irvingRoot, 'babel.config.node.js')
              : path.join(irvingRoot, 'babel.config.web.js'),
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
              exportLocalsConvention: 'camelCase',
            },
            sourceMap: !isProd,
          },
        },
      ],
    },
  ];
};
