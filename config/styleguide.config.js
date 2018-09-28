const path = require('path');
const paths = require('./paths');

module.exports = {
  components: path.join(paths.appRoot, 'components/**/*.js'),
  webpackConfig: require('./webpack.config.js')({}, { mode: process.env.NODE_ENV })
    .find((config) => config.name === 'client'),
  skipComponentsWithoutExample: true,
  styleguideDir: paths.styleguideRoot,
};
