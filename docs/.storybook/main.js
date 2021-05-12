const path = require('path');
const webpack = require('webpack');
const { packagesRoot } = require('./paths');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../stories/**/*.stories.@(js|mdx)',
    `${path.join(packagesRoot, 'styled-components/components')}/**/*.stories.@(js|mdx)`,
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
        proxyPassthrough: JSON.stringify([]),
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
