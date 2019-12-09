const path = require('path');
const omit = require('lodash/fp/omit');
const { irvingRoot } = require('@irvingjs/core/config/paths');
const componentGlobs = {
  core: path.join(irvingRoot, 'components/**/*.js'),
  helpers: path.join(irvingRoot, 'components/helpers/**/*.js'),
};

module.exports = {
  ignore: [
    path.join(irvingRoot, 'components/hoc/**/*.js'),
  ],
  sections: [
    {
      name: 'Irving Core',
      content: path.join(irvingRoot, 'components/readme.md'),
      sections: [
        {
          name: 'Core Components',
          content: path.join(irvingRoot, 'components/components.md'),
          components: componentGlobs.core,
          // Everything excluding the other sections.
          ignore: Object.values(omit(['core'], componentGlobs)),
        },
        {
          name: 'Helper Components',
          content: path.join(irvingRoot, 'components/helpers/helpers.md'),
          components: componentGlobs.helpers,
        },
      ],
    },
  ],
};
