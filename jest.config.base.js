const path = require('path');

module.exports = {
  setupFiles: [path.join(__dirname, './test/jest.setup.js')],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  testMatch: [
    '**/*.test.js',
  ],
  testURL: 'https://irving.com',
  transform: {
    '^.+\\.(js|jsx)$': path.join(__dirname, 'babelTransform.js'),
    '^.+\\.css$': path.join(__dirname, '/__mocks__/mockCssTransform.js'),
  },
  moduleDirectories: [
    'node_modules',
    'test',
    __dirname,
  ],
  moduleNameMapper: {
    '\\.svg$': path.join(__dirname, '/__mocks__/mockSVG.js'),
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@irvingjs)',
    '<rootDir>/packages/[^/]+/lib/',
  ],
};
