const { getValueFromFiles } = require('./config/irving/getValueFromFiles');
const { buildContext } = require('./config/paths');
const getModuleResolverOptions = require('./config/getModuleResolverOptions');

const config = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const coreConfig = {
    plugins: [
      [
        'module-resolver',
        getModuleResolverOptions('web'),
      ],
      [
        'react-remove-properties',
        {
          properties: [
            'data-testid',
          ],
        },
      ],
    ],
    presets: [
      '@irvingjs/irving',
    ],
  };

  // Add fast refresh plugin only in development.
  if (process.env.NODE_ENV === 'development') {
    coreConfig.plugins.push(
      ['react-refresh/babel', {
        skipEnvCheck: true,
      }],
    );
  }

  return getValueFromFiles(
    'config/babel.config.js',
    coreConfig,
    { base: buildContext },
  );
};

module.exports = config;
