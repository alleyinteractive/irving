const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          actions: './actions',
          reducers: './reducers',
          config: './config',
          components: './components',
          sagas: './sagas',
          services: './services',
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
