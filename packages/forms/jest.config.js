const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irving/forms',
  displayName: '@irving/forms',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
