const path = require('path');

module.exports = {
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  testMatch: [
    '**/*.test.js',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.css$': path.join(__dirname, '/test/mockCssTransform.js'),
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/[^/]+/lib/',
  ],
};
