module.exports = {
  stories: [
    '../stories/**/*.stories.js',
    '../packages/styled-components/components/**/*.stories.(js|mdx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
};
