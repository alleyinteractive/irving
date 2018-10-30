const path = require('path');
const paths = require('./paths');

module.exports = {
  components: path.join(paths.appRoot, 'components/**/*.js'),
  require: [paths.styleguideRoot],
  skipComponentsWithoutExample: true,
  styleguideDir: paths.styleguideRoot,
  webpackConfig: {
    ...require('./webpack.config.js')({}, { mode: process.env.NODE_ENV })
      .find((config) => config.name === 'client'),
    // Recreate aliases as we can't use the same babel aliases for styleguide
    resolve: {
      alias: {
        assets: path.join(paths.appRoot, './assets'),
        actions: path.join(paths.appRoot, './actions'),
        components: path.join(paths.appRoot, './components'),
        config: path.join(paths.appRoot, './config'),
        reducers: path.join(paths.appRoot, './reducers'),
        sagas: path.join(paths.appRoot, './sagas'),
        selectors: path.join(paths.appRoot, './selectors'),
        services: path.join(paths.appRoot, './services'),
        utils: path.join(paths.appRoot, './utils'),
      }
    }
  },
};
