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
    '^.+\\.(js|jsx)$': path.join(__dirname, 'babelTransform.js'),
    '^.+\\.css$': path.join(__dirname, '/__mocks__/mockCssTransform.js'),
    '^.+\\.svg$': path.join(__dirname, '/__mocks__/mockSvgTransform.js'),
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@irvingjs)',
    '<rootDir>/packages/[^/]+/lib/',
  ],
};
