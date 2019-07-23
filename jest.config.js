module.exports = {
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/utils/mockCssTransform.js',
  },
  testEnvironment: 'enzyme',
  setupFiles: ['<rootDir>/config/jest.setup'],
  setupFilesAfterEnv: ['jest-enzyme'],
};
