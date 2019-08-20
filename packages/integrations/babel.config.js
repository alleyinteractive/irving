const path = require('path');

module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve(__dirname)],
        alias: {
          config: './config',
          components: './components',
        },
      },
    ],
  ],
  presets: [
    require.resolve('@irving/babel-preset-irving'),
  ],
};
