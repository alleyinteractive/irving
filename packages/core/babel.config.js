const path = require('path');
const fs = require('fs');
const { irvingRoot, appRoot } = require('./config/paths');
const scopeDir = path.join(__dirname, '../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));

module.exports = {
  env: {
    app: {
      plugins: [
        [
          'module-resolver',
          {
            root: [
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
              '@irvingjs/irving.config': path.join(appRoot, 'irving.config.js'),
            },
          },
        ],
      ],
      presets: [
        '@irvingjs/irving',
      ],
    },
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
                'irving-test.config.js'
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
