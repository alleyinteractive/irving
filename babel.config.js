module.exports = {
  plugins: [
    'lodash',
    'react-hot-loader/babel',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          assets: './assets',
          actions: './actions',
          components: './components',
          config: './config',
          reducers: './reducers',
          sagas: './sagas',
          selectors: './selectors',
          services: './services',
          utils: './utils',
        },
      },
    ],
    'universal-import',
  ],
  presets: [
    '@babel/env',
    '@babel/react',
  ],
};
