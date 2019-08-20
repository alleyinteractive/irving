const { irvingRoot } = require('./config/paths');
console.log(irvingRoot);

module.exports = {
  env: {
    app: {
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            root: [`${irvingRoot}/`],
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
        require.resolve('@irving/babel-preset-irving'),
      ],
    },
    test: {
      presets: [
        require.resolve('@irving/babel-preset-irving'),
      ],
    },
  },
};
