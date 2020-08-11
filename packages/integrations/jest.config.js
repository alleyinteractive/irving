const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/integrations',
  displayName: '@irvingjs/integrations',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
