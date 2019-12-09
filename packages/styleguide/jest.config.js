const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/vip-go',
  displayName: '@irvingjs/vip-go',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
