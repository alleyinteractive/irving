const babelConfig = require('./config/getBabelConfig.js');
const webpackConfig = require('./config/getWebpackConfig.js');
const variables = require('./variables');

module.exports = {
  name: 'styled',
  babelConfig,
  webpackConfig,
  cssVariables: variables,
};
