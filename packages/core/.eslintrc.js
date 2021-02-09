const { getValueFromFiles } = require('./config/irving/getValueFromFiles');
const { buildContext } = require('./config/paths');

const config = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      jsx: true,
    },
    sourceType: 'module',
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
    'array-bracket-spacing': [2, 'never'],
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'dot-location': [2, 'property'],
    'func-names': [1, 'always'],
    'function-paren-newline': ['error', 'consistent'],
    'id-length': ['error', {
      properties: 'never',
      exceptions: ['x', 'y', 'i', 'e', 'n', 'k'],
    }],
    indent: [2, 2, { SwitchCase: 1 }],
    'keyword-spacing': ['error', { after: true }],
    'max-len': [2, 80, 4, {
      ignoreComments: true,
      ignoreUrls: true
    }],
    'no-bitwise': [2],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-constant-condition': ['error'],
    'no-var': [2],
    'no-use-before-define': [2, 'nofunc'],
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, 'never'],
    'operator-linebreak': ['error', 'after'],
    'prefer-const': ['error'],
    quotes: [2, 'single'],
    'import/extensions': [0],
    'import/newline-after-import': [0],
    'import/no-named-as-default': [0],
    'import/no-named-as-default-member': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'import/prefer-default-export': [0],
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
    }],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-props-no-spreading': [0],
    'react/forbid-prop-types': [0],
    'react/state-in-constructor': [0],
    semi: [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-unary-ops': [2, { words: true, nonwords: true }],
    'space-in-parens': [2, 'never'],
    'spaced-comment': [2, 'always'],
    yoda: [2, 'always'],
  },
};

module.exports = getValueFromFiles(
  'config/.eslintrc.js',
  config,
  { base: buildContext }
);
