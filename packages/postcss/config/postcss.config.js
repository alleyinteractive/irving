// Plugins
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

// Other imports
const getConfigField = require('../utils/getConfigField');
const stylelintConfig = require('./stylelint.config.js');

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
      autoprefixer({
        flexbox: 'no-2009',
      }),
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
