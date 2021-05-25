module.exports = (config) => {
  const { plugins } = config;

  config.plugins = plugins.concat( // eslint-disable-line no-param-reassign
    require.resolve('babel-plugin-styled-components'),
  );

  return config;
};
