const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const getValueFromFiles = require(
  '@irvingjs/core/config/irving/getValueFromFiles'
);
const { buildContext } = require('@irvingjs/core/config/paths');
const stylelintConfig = require('./stylelint.config.js');

// Call all config getters, passing in configs in succession.
const processedStylelintConfig = getValueFromFiles(
  'config/stylelint.config.js',
  stylelintConfig,
  {
    base: buildContext,
    ignorePackages: ['@irvingjs/postcss'],
  }
);

// Base postcss config.
const baseConfig = {
  plugins: [
    stylelint(processedStylelintConfig),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
};

// Call all config getters, passing in configs in succession.
const config = getValueFromFiles(
  'config/postcss.config.js',
  baseConfig,
  {
    base: buildContext,
    ignorePackages: ['@irvingjs/postcss'],
  }
);

// Config
module.exports = config;
