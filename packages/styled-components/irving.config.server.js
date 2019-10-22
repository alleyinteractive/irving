const babelConfig = require('./config/getBabelConfig.js');
const webpackConfig = require('./config/getWebpackConfig.js');
const variables = require('./variables');

module.exports = {
  name: 'styled-components',
  babelConfig,
  webpackConfig,
  cssVariables: variables,
};
