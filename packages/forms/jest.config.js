const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/forms',
  displayName: '@irvingjs/forms',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
