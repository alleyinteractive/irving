const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/postcss',
  displayName: '@irvingjs/postcss',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
