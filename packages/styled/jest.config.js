const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/styled',
  displayName: '@irvingjs/styled',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
