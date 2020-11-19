import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Some more hacky jest stuff to fix mock-fs and console.log, see https://github.com/tschaub/mock-fs/issues/234
global.console = require('../__mocks__/console');

// Put in a value for this for testing.
process.env.IRVING_EXECUTION_CONTEXT = 'development_server';

global.proxyPassthrough = [
  '/test/**/*',
];
