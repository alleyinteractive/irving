const path = require('path');
const {
  getValueFromFiles,
} = require('./irving/getValueFromFiles');
const { maybeResolveBuildModule } = require('../utils/userModule');
const { buildContext } = require('./paths');

// App aliases, exported in case we need them elsewhere.
const aliases = {
  '@components': '@irvingjs/core/components',
  actions: path.join(buildContext, './actions'),
  assets: path.join(buildContext, './assets'),
  components: path.join(buildContext, './components'),
  hooks: path.join(buildContext, './hooks'),
  reducers: path.join(buildContext, './reducers'),
  sagas: path.join(buildContext, './sagas'),
  selectors: path.join(buildContext, './selectors'),
  server: path.join(buildContext, './server'),
  services: path.join(buildContext, './services'),
  utils: path.join(buildContext, './utils'),
  config: path.join(buildContext, './config'),
  // Aliases for irving config files. Use core defaults if they don't exist.
  '@irvingjs/irving.config': maybeResolveBuildModule('irving.config.js'),
  // Multisite config alias.
  '@irvingjs/multisite.config': maybeResolveBuildModule('multisite.config.js'),
  // don't use maybeResolveBuildModule here because the this file is required, user must have it.
  '@irvingjs/componentMap': path.join(buildContext, 'componentMap.js'),
};

module.exports = getValueFromFiles(
  'config/aliases',
  aliases,
  { base: buildContext },
);
