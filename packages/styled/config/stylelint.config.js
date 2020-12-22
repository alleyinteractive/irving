const path = require('path');
const {
  getValueFromFiles,
} = require('@irvingjs/core/config/irving/getValueFromFiles');
const {
  buildContext,
  localRoot,
} = require('@irvingjs/core/config/paths');
const propertyOrder = require('./stylelintPropertyOrder');

const baseConfig = {
  plugins: [
    'stylelint-order',
  ],
  processors: [
    'stylelint-processor-styled-components',
  ],
  extends: [
    'stylelint-config-styled-components',
  ],
  ignoreFiles: [
    path.join(localRoot, '**/*.js'),
    path.join(buildContext, 'node_modules/**/*.js'),
  ],
  rules: {
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: ['after-comment'],
    }],
    indentation: 2,
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always',
    'at-rule-semicolon-newline-after': 'always',
    'block-closing-brace-newline-after': 'always',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-space-before': 'always',
    'color-no-invalid-hex': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'length-zero-no-unit': true,
    'max-empty-lines': 1,
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'no-extra-semicolons': true,
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'always',
    'order/properties-order': [
      {
        properties: propertyOrder,
        unspecified: 'top',
      },
    ],
    'rule-empty-line-before': ['always', {
      ignore: ['after-comment'],
    }],
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-list-comma-newline-after': 'always',
    'selector-max-specificity': ['0,3,1', {
      ignoreSelectors: [':global', ':local'],
    }],
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'unit-no-unknown': true,
    'value-keyword-case': ['lower', {
      ignoreKeywords: ['dummyValue'],
    }],
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-no-vendor-prefix': true,
  },
};

module.exports = getValueFromFiles(
  'config/stylelint.config.js',
  baseConfig,
  {
    base: buildContext,
    ignorePackages: ['@irvingjs/styled'],
  }
);
