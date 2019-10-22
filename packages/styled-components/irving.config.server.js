const configFields = require('./config/configFields.js');
const babelConfig = require('./config/getBabelConfig.js');
const webpackConfig = require('./config/getWebpackConfig.js');

module.exports = {
  name: 'styled-components',
  babelConfig,
  webpackConfig,
  configFields,
};
