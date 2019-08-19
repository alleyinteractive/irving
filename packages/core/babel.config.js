const path = require('path');
const defaultConfig = {
  extends: path.join('../../babel.config.base.js'),
  plugins: [
    [
      'module-resolver',
      { root: ['./**'] },
    ],
  ],
};

module.exports = {
  env: {
    app: defaultConfig,
    test: defaultConfig,
    build: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: '10',
            },
          },
        ],
      ],
    },
  },
};
