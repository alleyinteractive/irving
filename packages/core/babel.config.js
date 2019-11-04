const path = require('path');
const fs = require('fs');
const getConfigField = require('./utils/getConfigField');
const {
  irvingRoot,
  appRoot,
  buildContext,
} = require('./config/paths');
const scopeDir = path.join(__dirname, '../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));

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
            appRoot,
            ...packageRoots,
          ],
          cwd: 'packagejson',
          alias: {
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
            // Tests need an irving config, use an alias so we can use a separate test config.
            // @todo might want to update this to @irvingjs also.
            '@irvingjs/irving.config': path.join(
              buildContext,
              'irving.config.js'
            ),
            '@irvingjs/irving.config.server': path.join(
              buildContext,
              'irving.config.server.js'
            ),
          },
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
                // @todo might want to update this to @irvingjs also.
                '@irvingjs/irving.config': path.join(
                  irvingRoot,
                  'test/irving-test.config.js'
                ),
                '@irvingjs/irving.config.server': path.join(
                  irvingRoot,
                  'test/irving-test.config.js'
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
