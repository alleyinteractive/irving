// Plugins
const calc = require('postcss-calc');
const cssImport = require('postcss-import');
const variables = require('postcss-simple-vars');
const nested = require('postcss-nested');
const units = require('postcss-units');
const colorFunction = require('postcss-color-function');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-sassy-mixins');
const focus = require('postcss-focus');
const stylelint = require('stylelint');
const browserReporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');

// Other imports
const getConfigField = require('../utils/getConfigField');
const paths = require('./paths');
const stylelintConfig = require('./stylelint.config.js');
const cssVars = require('./css');
const flatten = require('../utils/flatten');

// Config
module.exports = () => {
  // Customize stylelint.
  const stylelintConfigGetters = getConfigField('stylelintConfig');
  // Call all config getters, passing in configs in succession.
  const processedStylelintConfig = stylelintConfigGetters.reduce(
    (acc, getter) => getter(acc),
    stylelintConfig
  );

  // Base postcss config.
  const config = {
    plugins: [
      stylelint(processedStylelintConfig),
      cssImport({
        path: [
          paths.globalStyles,
        ],
      }), // Import files
      mixins(),
      variables({
        variables: flatten(cssVars),
      }),
      units(), // Compute rem() function
      nested(), // Allow nested syntax.
      calc({
        mediaQueries: true,
      }),
      colorFunction(),
      focus(),
      autoprefixer({
        flexbox: 'no-2009',
      }),
      browserReporter(),
      reporter(),
    ],
  };

  // Customize postcss.
  const configGetters = getConfigField('postcssConfig');
  // Call all config getters, passing in configs in succession.
  const procssedConfig = configGetters.reduce(
    (acc, getter) => getter(acc),
    config
  );

  return procssedConfig;
};
