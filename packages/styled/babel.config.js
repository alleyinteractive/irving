const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          server: './server',
          variables: './variables',
          components: './components',
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
