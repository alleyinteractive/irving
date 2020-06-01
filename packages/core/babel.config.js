const path = require('path');
const fs = require('fs');
const getMergedConfigFromFilesystem = require('./utils/getConfigFiles');
const {
  irvingRoot,
  buildContext,
  mocks,
} = require('./config/paths');
const aliases = require('./config/aliases');
const scopeDir = path.join(__dirname, '../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));

// Main config function.
module.exports = (api) => {
  // Cache computed config forever.
  api.cache(true);

  // Base app babel config.
  const appConfig = {
    plugins: [
      [
        'module-resolver',
        {
          root: [
            buildContext,
            ...packageRoots,
          ],
          cwd: 'packagejson',
          alias: aliases,
        },
      ],
    ],
    presets: [
      '@irvingjs/irving',
    ],
  };

  // Only allow user to modify app config, not test.
  const processedConfig = getMergedConfigFromFilesystem(
    'babel.config.js',
    appConfig
  );

  return {
    env: {
      app: processedConfig,
      test: {
        plugins: [
          [
            'module-resolver',
            {
              root: [irvingRoot],
              // Tests need an irving config, use an alias so it doesn't override user config.
              alias: {
                '@irvingjs/irving.config': path.join(
                  mocks, 'irving.config.js'
                ),
                '@irvingjs/componentMap': path.join(
                  mocks, 'componentMap.js'
                ),
              },
            },
          ],
        ],
        presets: [
          '@irvingjs/irving',
        ],
      },
    },
  };
};
