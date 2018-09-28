const path = require('path');

module.exports = {
  components: path.resolve('components/**/*.js'),
  webpackConfig: require('./webpack.config.js')({}, { mode: 'development' })[0],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, '../styleguide/wrapper.js'),
  },
};
