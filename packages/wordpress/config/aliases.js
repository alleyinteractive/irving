const path = require('path');
const { buildContext } = require('@irvingjs/core/config/paths');
const { maybeResolve } = require('@irvingjs/core/utils/userModule');

// Determine path to user block map, if it exists.
let blockStylesConfig = maybeResolve(
  path.join(buildContext, './blockStyles.config.js'),
);

if (!blockStylesConfig) {
  blockStylesConfig = path.join(__dirname, './blockStyles.config.js');
}

module.exports = {
  '@irvingjs/blockStyles.config': blockStylesConfig,
};
