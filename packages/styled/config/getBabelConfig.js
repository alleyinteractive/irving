module.exports = (config) => {
  const { plugins } = config;

  config.plugins = plugins.concat( // eslint-disable-line no-param-reassign
    'styled-components'
  );

  return config;
};
