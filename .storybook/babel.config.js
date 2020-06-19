const aliases = require('../packages/core/config/aliases');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [
          "./packages/core/"
        ],
        cwd: "packagejson",
        alias: aliases,
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};
