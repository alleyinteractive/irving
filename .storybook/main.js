const webpack = require('webpack');
const getEnv = require('../packages/core/config/env');
const proxyPassthrough = require('../packages/core/config/proxyPassthrough');

module.exports = {
  stories: [
    '../stories/**/*.stories.(js|mdx)',
    '../packages/styled-components/components/**/*.stories.(js|mdx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
  webpackFinal: (config) => {
    config.plugins = config.plugins.concat([
      new webpack.EnvironmentPlugin({
        WEBPACK_BUILD: true,
      }),
      new webpack.DefinePlugin({
        irvingEnv: JSON.stringify(getEnv()),
        proxyPassthrough: JSON.stringify(proxyPassthrough),
      }),
    ]);
    config.module.rules[0].exclude.push([
      /\bcore-js\b/,
      /\bwebpack\/buildin\b/
    ]);
    return config;
  },
};
