const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          server: './server',
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
