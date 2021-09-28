const path = require('path');
const aliases = require('@irvingjs/core/config/aliases');
const getServiceAliases = require('@irvingjs/core/config/irving/getServiceAliases');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [process.cwd()],
        cwd: 'packagejson',
        alias: {
          ...aliases,
          ...getServiceAliases('web'),
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
