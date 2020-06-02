const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/wp-admin-bar',
  displayName: '@irvingjs/wp-admin-bar',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
