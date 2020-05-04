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
  testURL: 'https://irving.com',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.css$': path.join(__dirname, '/test/mockCssTransform.js'),
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@irvingjs)',
    '<rootDir>/packages/[^/]+/lib/',
  ],
};
