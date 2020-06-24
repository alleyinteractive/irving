const webpack = require('webpack');

module.exports = {
  stories: [
    '../stories/**/*.stories.(js|mdx)',
    '../packages/styled-components/components/**/*.stories.(js|mdx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
  webpackFinal: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        WEBPACK_BUILD: true,
      })
    );
    return config;
  },
};
