const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          server: './server',
          services: './services',
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
