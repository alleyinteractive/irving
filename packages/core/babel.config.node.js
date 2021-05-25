const path = require('path');
const { getValueFromFiles } = require('./config/irving/getValueFromFiles');
const getModuleResolverOptions = require('./config/getModuleResolverOptions');
const {
  buildContext,
} = require('./config/paths');
const shimPath = path.join(
  buildContext,
  'node_modules/@irvingjs/core/utils/shimDom'
);

const config = {
  plugins: [
    [
      'module-resolver',
      getModuleResolverOptions('node'),
    ],
    ['transform-globals', {
      require: {
        [shimPath]: {
          window: 'default',
        },
      },
    }],
    [
      'react-remove-properties',
      {
        properties: [
          'data-testid',
        ],
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};

module.exports = getValueFromFiles(
  'config/babel.config.js',
  config,
  { base: buildContext }
);
