const path = require('path');
const { appRoot } = require('@irvingjs/core/config/paths');

const { buildContext } = require('@irvingjs/core/config/paths');
const { maybeResolve } = require('@irvingjs/core/utils/userModule');

// Determine path to user block map, if it exists.
let blockStylesConfig = maybeResolve(
  path.join(buildContext, './blockStyles.config.js'),
);

if (!blockStylesConfig) {
  blockStylesConfig = path.join(__dirname, './blockStyles.config.js');
}

const aliases = {
  '@irvingjs/blockStyles.config': blockStylesConfig,
}

if (process.env.NODE_ENV === 'development') {
  aliases['styled-components'] = path.join(
    appRoot,
    './node_modules/styled-components',
  );
}

module.exports = aliases;
