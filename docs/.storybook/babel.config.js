const path = require('path');
const packagesRoot = path.join(__dirname, '../../packages');
const aliases = require(path.join(packagesRoot, 'core/config/aliases'));

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
          '@irvingjs/componentMap': path.resolve(
            __dirname,
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
