const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          components: './components',
          config: './config',
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
