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
          { root: [irvingRoot] },
        ],
      ],
      presets: [
        '@irving/irving',
      ],
    },
  },
};
