const path = require('path');

module.exports = {
  components: path.resolve('components/**/*.js'),
  webpackConfig: require('./webpack.config.js')({}, { mode: 'development' })[0],
};
