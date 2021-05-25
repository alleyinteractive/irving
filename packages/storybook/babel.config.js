const path = require('path');
const aliases = require('@irvingjs/core/config/aliases');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [process.cwd()],
        cwd: 'packagejson',
        alias: {
          ...aliases,
          '@irvingjs/componentMap': path.resolve(
            process.cwd(),
            'componentMap.js',
          ),
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
