const path = require('path');
const { serverRoot, appRoot } = require('../paths');

module.exports = (mode, opEnv) => {
  switch (`${mode}_${opEnv}`) {
    case 'production_server':
    case 'development_server':
      return serverRoot;

    case 'production_client':
      return {
        main: [
          'babel-polyfill',
          path.join(appRoot),
        ],
      };

    case 'development_client':
      return {
        dev: [
          'babel-polyfill',
          'webpack-hot-middleware/client',
          path.join(appRoot),
        ],
      };

    default:
      throw new Error('Unknown configuration environment');
  }
};
