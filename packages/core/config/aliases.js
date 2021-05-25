const path = require('path');
const {
  getValueFromFiles,
} = require('./irving/getValueFromFiles');
const { maybeResolveBuildModule } = require('../utils/userModule');
const { buildContext } = require('./paths');

// App aliases, exported in case we need them elsewhere.
const aliases = {
  '@components': '@irvingjs/core/components',
  actions: './actions',
  assets: './assets',
  components: './components',
  hooks: './hooks',
  reducers: './reducers',
  sagas: './sagas',
  selectors: './selectors',
  server: './server',
  services: './services',
  utils: './utils',
  config: './config',
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
