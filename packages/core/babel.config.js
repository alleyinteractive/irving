const path = require('path');
const { irvingRoot, appRoot } = require('./config/paths');

module.exports = {
  env: {
    app: {
      plugins: [
        [
          'module-resolver',
          {
            root: [
              appRoot,
              irvingRoot,
            ],
            cwd: 'packagejson',
            alias: {
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
            },
          },
        ],
      ],
      presets: [
        path.join(appRoot, 'node_modules/@irving/babel-preset-irving'),
      ],
    },
    test: {
      plugins: [
        [
          'module-resolver',
          {
            root: [irvingRoot],
            alias: {
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
            },
          },
        ],
      ],
      presets: [
        '@irving/irving',
      ],
    },
  },
};
