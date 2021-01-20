const path = require('path');
const getServiceAliases = require(
  './packages/core/config/irving/getServiceAliases'
);
const { irvingRoot, mocks } = require('./packages/core/config/paths');
// Adding a test comment. Another one.
const babelOptions = {
  plugins: [
    [
      'module-resolver',
      {
        root: [irvingRoot],
        // Tests need an irving config, use an alias so it doesn't override user config.
        alias: {
          ...getServiceAliases('node'),
          '@irvingjs/irving.config': path.join(
            mocks,
            'irving.config.js'
          ),
          '@irvingjs/multisite.config': path.join(
            mocks,
            'multisite.config.js'
          ),
          '@irvingjs/componentMap': path.join(
            mocks,
            'componentMap.js'
          ),
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
