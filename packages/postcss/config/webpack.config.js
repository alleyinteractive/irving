module.exports = (config) => {
  config.module.rules = config.module.rules
    .map((rule) => {
      // If it's the CSS loader array, push another loader on for postcss.
      if (rule.test && rule.test.toString().includes('css')) {
        rule.use.push({
          loader: 'postcss-loader',
          options: {
            config: {
              path: require.resolve('./postcss.config.js'),
            },
          },
        });
      }

      return rule;
    });

  return config;
};
