const { serverBuild, clientBuild, rootUrl } = require('../paths');

module.exports = (mode, opEnv) => {
  switch (`${mode}_${opEnv}`) {
    case 'production_server':
    case 'development_server':
      return {
        path: serverBuild,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
      };

    case 'production_client':
      return {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      };

    case 'development_client':
      return {
        path: clientBuild,
        publicPath: `${process.env.ROOT_URL}/`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
      };

    default:
      throw new Error('Unknown configuration environment');
  }
};
