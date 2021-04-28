const webpack = require('webpack');
const getEnv = require('../packages/core/config/env');
const proxyPassthrough = require('../packages/core/config/proxyPassthrough');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../stories/**/*.stories.@(js|mdx)',
    '../packages/styled-components/components/**/*.stories.@(js|mdx)',
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
    console.log(config.resolve.alias);
    config.module.rules[0].exclude = [
      /\bcore-js\b/,
      /\bwebpack\/buildin\b/,
      /\bnode_modules\b/,
    ];
    return config;
  },
};
