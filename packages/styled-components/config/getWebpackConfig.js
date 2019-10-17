module.exports = (configs) => (
  configs.map((config) => {
    config.module.rules = config.module.rules
      .map((rule) => {
        // If it's the CSS loader array, push another loader on for postcss.
        if (
          rule.test &&
          rule.test.toString().includes('jsx') &&
          ! rule.enforce
        ) {
          rule.use.push({
            loader: 'stylelint-custom-processor-loader',
            options: {
              configPath: './stylelint.config.js',
            },
          });
        }

        return rule;
      });

    return config;
  })
);
