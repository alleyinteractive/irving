const path = require('path');
const { serverRoot, clientRoot } = require('../paths');

module.exports = (mode, opEnv) => {
  switch (`${mode}_${opEnv}`) {
    case 'production_server':
    case 'development_server':
      return serverRoot;

    case 'production_client':
      return [
        'babel-polyfill',
        path.join(clientRoot),
      ];

    case 'development_client':
      return [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        path.join(clientRoot),
      ];

    default:
      throw new Error('Unknown configuration environment');
  }
};
