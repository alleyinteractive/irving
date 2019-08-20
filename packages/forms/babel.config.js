const path = require('path');

module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve(__dirname)],
        alias: {
          actions: './actions',
          reducers: './reducers',
          config: './config',
          components: './components',
          sagas: './sagas',
        },
      },
    ],
  ],
  presets: [
    require.resolve('@irving/babel-preset-irving'),
  ],
};
