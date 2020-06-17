const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const { getConfigObject } = require('@irvingjs/core/config/irving/getValueFromMergedConfig');
const stylelintConfig = require('./stylelint.config.js');

// Config
module.exports = () => {
  // Call all config getters, passing in configs in succession.
  const processedStylelintConfig = getConfigObject(
    'stylelintConfig',
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

  // Call all config getters, passing in configs in succession.
  const procssedConfig = getConfigObject('postcssConfig', config);

  return procssedConfig;
};
