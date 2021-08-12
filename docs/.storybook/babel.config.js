const path = require('path');
const { packagesRoot } = require('./paths');
const aliases = require(path.join(packagesRoot, 'core/config/aliases'));
const getServiceAliases = require(path.join(packagesRoot, 'core/config/irving/getServiceAliases'));

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [
          path.join(packagesRoot, 'core'),
        ],
        cwd: "packagejson",
        alias: {
          ...aliases,
          ...getServiceAliases('web'),
          '@irvingjs/componentMap': path.resolve(
            __dirname,
            '../componentMap.js'
          ),
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
