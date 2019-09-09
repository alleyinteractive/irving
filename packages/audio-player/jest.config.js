const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irvingjs/audio-player',
  displayName: '@irvingjs/audio-player',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
