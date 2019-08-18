const path = require('path');

module.exports = {
  extends: path.join('../../babel.config.base.js'),
  plugins: [
    [
      'module-resolver',
      {
        root: ['./', './src/**'],
        alias: {
          config: './config',
        },
      },
    ],
  ],
};
