const babelConfig = require('./config/getBabelConfig.js');
const webpackConfig = require('./config/getWebpackConfig.js');

module.exports = {
  name: 'styled',
  babelConfig,
  webpackConfig,
};
