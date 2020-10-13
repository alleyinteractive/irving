const path = require('path');
const fs = require('fs');
const { getValueFromFiles } = require('./config/irving/getValueFromFiles');
const getServiceAliases = require('./config/irving/getServiceAliases');
const {
  buildContext,
} = require('./config/paths');
const aliases = require('./config/aliases');
const scopeDir = path.join(__dirname, '../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));

const config = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const coreConfig = {
    plugins: [
      [
        'module-resolver',
        {
          root: [
            buildContext,
            ...packageRoots,
          ],
          cwd: 'packagejson',
          alias: {
            ...getServiceAliases('web'),
            ...aliases,
          },
        },
      ],
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

  // Add fast refresh plugin only in development.
  if ('development' === process.env.NODE_ENV) {
    coreConfig.plugins.push(
      ['react-refresh/babel', {
        skipEnvCheck: true,
      }]
    );
  }

  return getValueFromFiles(
    'config/babel.config.js',
    coreConfig,
    { base: buildContext }
  );
};

module.exports = config;
