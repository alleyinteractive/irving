const path = require('path');

// Config used for running tests, transpilation when user is developing or building app.
const defaultConfig = {
  extends: path.resolve('../../babel.config.base.js'),
};

module.exports = {
  env: {
    app: defaultConfig,
    test: defaultConfig,
    // Config used for preparing irving CLI to be published.
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
