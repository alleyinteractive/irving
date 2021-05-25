const path = require('path');

module.exports = {
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      jsx: true,
    },
    sourceType: 'module',
    babelOptions: {
      configFile: path.join(__dirname, './babel.config.web.js'),
    },
  },
  plugins: ['react'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  globals: {},
  rules: {
    'import/no-extraneous-dependencies': [0],
  },
};
