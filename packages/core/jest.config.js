const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/core',
  displayName: '@irvingjs/core',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
