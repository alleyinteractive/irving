const babelConfig = require('./config/getBabelConfig.js');
const webpackConfig = require('./config/getWebpackConfig.js');
const variables = require('./variables');
const styleguideConfig = require('./config/styleguide.config.js');

module.exports = {
  name: 'styled',
  babelConfig,
  webpackConfig,
  cssVariables: variables,
  styleguideConfig,
};
