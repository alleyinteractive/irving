// eslint-disable-next-line import/extensions
const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/tracking',
  displayName: '@irvingjs/tracking',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
