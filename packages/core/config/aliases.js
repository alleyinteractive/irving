const path = require('path');
const { maybeResolveUserModule } = require('../utils/userModule');
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
  '@irvingjs/irving.config': maybeResolveUserModule('irving.config.js'),
  '@irvingjs/irving.config.server': maybeResolveUserModule(
    'irving.config.server.js'
  ),
  '@irvingjs/componentMap': path.join(
    buildContext,
    'componentMap.js'
  ),
};
