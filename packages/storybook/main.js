const webpack = require('webpack');
const getEnv = require('@irvingjs/core/config/env');
const proxyPassthrough = require('@irvingjs/core/config/proxyPassthrough');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    `${process.cwd()}/**/*.stories.@(js|mdx)`,
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
  webpackFinal: (config) => {
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        irvingEnv: JSON.stringify(getEnv()),
        proxyPassthrough: JSON.stringify(proxyPassthrough),
      }),
    ]);
    config.module.rules[0].exclude = [
      /\bcore-js\b/,
      /\bwebpack\/buildin\b/,
      /\bnode_modules\b/,
    ];
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    };
    return config;
  },
};
