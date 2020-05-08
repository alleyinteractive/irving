module.exports = {
  stories: [
    '../stories/**/*.stories.js',
    '../packages/core/components/**/*.stories.(js|mdx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
};
