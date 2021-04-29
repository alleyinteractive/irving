const path = require('path');
const aliases = require('../packages/core/config/aliases');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [
          "./packages/core/"
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
