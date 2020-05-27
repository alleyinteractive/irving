const path = require('path');
const { maybeResolveBuildModule } = require('../utils/userModule');
const { buildContext } = require('./paths');

// App aliases, exported in case we need them elsewhere.
module.exports = {
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
  // Aliases for irving config files. Use core defaults if they don't exist.
  '@irvingjs/irving.config': maybeResolveBuildModule('irving.config.js'),
  '@irvingjs/componentMap': path.join(buildContext, 'componentMap.js'),
};
