const path = require('path');
const paths = require('./paths');

module.exports = {
  components: path.join(paths.appRoot, 'components/**/*.js'),
  webpackConfig: require('./webpack.config.js')({}, { mode: 'development' })[0],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(paths.styleguideRoot, './components/wrapper.js'),
  },
  styleguideDir: paths.styleguideRoot,
};
