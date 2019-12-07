const path = require('path');
const paths = require('@irvingjs/core/config/paths');

const componentGlobs = {
  core: path.join(paths.irvingRoot, 'components/**/*.js'),
  hoc: path.join(paths.irvingRoot, 'components/hoc/**/*.js'),
  helpers: path.join(paths.irvingRoot, 'components/helpers/**/*.js'),
};

module.exports = {
  sections: [
    {
      name: 'Irving Core',
      content: path.join(paths.irvingRoot, 'components/readme.md'),
      sections: [
        {
          name: 'Core Components',
          content: path.join(paths.irvingRoot, 'components/components.md'),
          components: componentGlobs.utility,
          // Everything excluding the other sections.
          ignore: Object.values(componentGlobs),
        },
        {
          name: 'Higher-Order Components',
          content: path.join(paths.irvingRoot, 'components/hoc/hoc.md'),
          components: componentGlobs.hoc,
        },
        {
          name: 'Helper Components',
          content: path.join(paths.irvingRoot, 'components/helpers/helpers.md'),
          components: componentGlobs.helpers,
        },
      ],
    },
  ],
};
