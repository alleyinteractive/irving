const path = require('path');
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
  // Aliases for irving config files.
  '@irvingjs/irving.config': path.join(
    buildContext,
    'irving.config.js'
  ),
  '@irvingjs/irving.config.server': path.join(
    buildContext,
    'irving.config.server.js'
  ),
  '@irvingjs/componentMap': path.join(
    buildContext,
    'componentMap.js'
  ),
};
