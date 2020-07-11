const path = require('path');

/**
 * This babel config will be used exclusively for testing.
 */
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
