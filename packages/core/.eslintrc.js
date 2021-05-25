const path = require('path');
const getModuleResolverOptions = require('./config/getModuleResolverOptions');

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
      'babel-module': getModuleResolverOptions('web'),
    },
  },
  globals: {},
  rules: {
    'import/no-extraneous-dependencies': [0],
    'import/prefer-default-export': [0],
    'react/state-in-constructor': [1, 'never'],
  },
};
