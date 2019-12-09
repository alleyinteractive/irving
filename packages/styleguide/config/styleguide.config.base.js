const path = require('path');
const paths = require('@irvingjs/core/config/paths.js');
const webpackConfig = require('@irvingjs/core/config/webpack.config.js');
const aliases = require('@irvingjs/core/config/aliases.js');

console.log(aliases);

module.exports = {
  title: 'Irving',
  require: [path.join(__dirname, './styleguide.js')],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, '../components/wrapper.js'),
  },
  styleguideDir: path.join(paths.appRoot, 'styleguide'),
  webpackConfig: {
    ...webpackConfig({}, { mode: process.env.NODE_ENV })
      .find((config) => 'client' === config.name),
    // Recreate aliases as we can't use the same babel aliases for styleguide
    resolve: {
      alias: {
        // Make all aliases absolute paths.
        ...Object.keys(aliases).reduce(
          (acc, alias) => (
            [...acc, path.join(paths.irvingRoot, alias)]
          )
        ),
      },
    },
  },
};
