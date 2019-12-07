const path = require('path');
const fs = require('fs');
const getConfigField = require('./utils/getConfigField');
const {
  irvingRoot,
  buildContext,
} = require('./config/paths');
const scopeDir = path.join(__dirname, '../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));
const appAliases = {
  '@components': '@irvingjs/core/components',
  actions: './actions',
  assets: './assets',
  components: './components',
  hooks: './hooks',
  reducers: './reducers',
  sagas: './sagas',
  selectors: './selectors',
  server: './server',
  services: './services',
  utils: './utils',
  // Aliases for irving config files.
  '@irvingjs/irving.config': path.join(
    buildContext,
    'irving.config.js'
  ),
  '@irvingjs/irving.config.server': path.join(
    buildContext,
    'irving.config.server.js'
  ),
  '@irvingjs/componentMap': path.join(
    buildContext,
    'componentMap.js'
  ),
};

module.exports.aliases = appAliases;
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
          alias: appAliases,
        },
      ],
    ],
    presets: [
      '@irvingjs/irving',
    ],
  };

  const configGetters = getConfigField('babelConfig');
  // Call all config getters, passing in configs in succession.
  // Only allow users to modify app config, not test.
  const processedConfigs = configGetters.reduce(
    (acc, getter) => getter(acc),
    appConfig
  );

  return {
    env: {
      app: processedConfigs,
      test: {
        plugins: [
          [
            'module-resolver',
            {
              root: [irvingRoot],
              // Tests need an irving config, use an alias so it doesn't override user config.
              alias: {
                '@irvingjs/irving.config': path.join(
                  irvingRoot,
                  'test/irving-test.config.js'
                ),
                '@irvingjs/irving.config.server': path.join(
                  irvingRoot,
                  'test/irving-test.config.js'
                ),
                '@irvingjs/componentMap': path.join(
                  irvingRoot,
                  'test/componentMap.js'
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
