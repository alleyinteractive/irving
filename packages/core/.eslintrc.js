module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest',
    'jasmine'
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: false,
    jasmine: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  globals: {},
  rules: {
    indent: [2, 2, {SwitchCase: 1}],
    'max-len': [2, 80, 4, {
      ignoreComments: true,
      ignoreUrls: true
    }],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'no-multiple-empty-lines': [2, {max: 1}],
    'comma-dangle': [2, 'always-multiline'],
    'dot-location': [2, 'property'],
    'one-var': [2, 'never'],
    'no-var': [2],
    'prefer-const': ['error'],
    'no-bitwise': [2],
    'id-length': ['error', {
      properties: 'never',
      exceptions: ['x', 'y', 'i', 'e', 'n', 'k'],
    }],
    'func-names': [1, 'always'],
    'no-use-before-define': [2, 'nofunc'],
    yoda: [2, 'always'],
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'space-unary-ops': [2, {words: true, nonwords: true}],
    'keyword-spacing': ['error', {after: true}],
    'space-before-blocks': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'spaced-comment': [2, 'always'],
    'no-confusing-arrow': ['error', {allowParens: true}],
    'no-constant-condition': ['error'],
    'arrow-parens': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'function-paren-newline': ['error', 'consistent'],
    'jsx-a11y/anchor-is-valid': [ 'error', {
      components: [ 'Link' ],
      specialLink: [ 'to' ]
    }],
    'import/newline-after-import': [0],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-props-no-spreading': [0],
    'react/forbid-prop-types': [0],
    'react/state-in-constructor': [0],
    'import/no-named-as-default': [0],
    'import/no-named-as-default-member': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'import/extensions': [0],
    'jasmine/no-focused-tests': [1],
    'jasmine/no-disabled-tests': [1],
    'jasmine/missing-expect': [2],
    'jasmine/valid-expect': [2],
    'jasmine/no-global-setup': [2],
    'jasmine/no-expect-in-setup-teardown': [2],
  },
};
