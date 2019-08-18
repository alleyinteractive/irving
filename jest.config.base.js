module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests',
  ],
  testURL: 'http://localhost',
  // testRegex: "(.*.(test|spec)).js$",
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/test/mockCssTransform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/[^/]+/lib/',
  ],
};
