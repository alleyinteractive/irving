const path = require('path');
const { maybeResolveBuildModule } = require('../utils/userModule');
const getConfigFileAliases = require('./getConfigFileAliases');
const { buildContext } = require('./paths');

// App aliases, exported in case we need them elsewhere.
module.exports = {
  ...getConfigFileAliases(),
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
  // maybeResolveBuildModule is appropraite here because config will never be used
  // outside build, we'll only rely on filesystem.
  '@irvingjs/irving.config': maybeResolveBuildModule('irving.config.js'),
  // don't use maybeResolveBuildModule here because the this file is required, user must have it.
  '@irvingjs/componentMap': path.join(buildContext, 'componentMap.js'),
};
