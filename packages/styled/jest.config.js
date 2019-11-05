const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/styled-components',
  displayName: '@irvingjs/styled-components',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
