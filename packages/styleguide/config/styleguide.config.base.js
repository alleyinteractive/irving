const path = require('path');
const paths = require('@irvingjs/core/config/paths');
const webpackConfig = require('@irvingjs/core/config/webpack.config.js');
const { aliases } = require('@irvingjs/core/babel.config.js');

const componentGlobs = {
  core: path.join(paths.irvingRoot, 'components/**/*.js'),
  hoc: path.join(paths.irvingRoot, 'components/hoc/**/*.js'),
  helpers: path.join(paths.irvingRoot, 'components/helpers/**/*.js'),
};

module.exports = {
  title: 'Irving',
  require: [paths.join(__dirname, './styleguide.js')],
  sections: [
    {
      name: 'Introduction and setup',
      content: path.join(paths.appRoot, 'README.md'),
    },
    {
      name: 'Usage Documentation',
      sections: [
        {
          name: 'Concepts',
          content: path.join(paths.appRoot, 'documentation/concepts.md'),
        },
      ],
    },
    {
      name: 'Irving Core Components',
      content: path.join(paths.appRoot, 'components/readme.md'),
      sections: [
        {
          name: 'Utility Components',
          content: path.join(paths.appRoot, 'components/utilityComponents.md'),
          components: componentGlobs.utility,
          ignore: [
            componentGlobs.form,
            componentGlobs.hoc,
            componentGlobs.helpers,
          ],
        },
        {
          name: 'Higher-Order Components',
          content: path.join(paths.appRoot, 'components/hoc/hoc.md'),
          components: componentGlobs.hoc,
        },
        {
          name: 'Helper Components',
          content: path.join(paths.appRoot, 'components/helpers/helpers.md'),
          components: componentGlobs.helpers,
        },
      ],
    },
  ],
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
            path.join(paths.irvingRoot, alias)
          )
        ),
      },
    },
  },
};
