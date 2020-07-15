const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          components: './components',
        },
      },
    ],
  ],
  env: {
    build: {
      plugins: [
        'react-remove-properties', {
          properties: ['data-testid']
        }
      ],
    }
  },
  presets: [
    '@irvingjs/irving',
  ],
};
