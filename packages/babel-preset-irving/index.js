const getTarget = (caller) => (
  (caller && caller.name === 'babel-loader') ? caller.target : null
);

module.exports = function babelPresetIrving(api) {
  const target = api.caller(getTarget);
  let envConfig;

  // Configure babel preset env based on webpack target.
  switch (target) {
    case 'web':
      envConfig = {
        targets: {
          browsers: 'last 3 versions',
        },
      };
      break;

    case 'node':
    default:
      envConfig = {
        targets: {
          node: '12',
        },
      };
      break;
  }

  /* eslint-disable global-require */
  return {
    sourceType: 'unambiguous',
    plugins: [
      require('babel-plugin-lodash'),
      require('@babel/plugin-proposal-object-rest-spread'),
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-syntax-dynamic-import'),
      [require('@babel/plugin-transform-runtime'), {
        corejs: 3,
        useESModules: false,
      }],
    ],
    presets: [
      [
        require('@babel/preset-env'),
        envConfig,
      ],
      require('@babel/preset-react'),
    ],
  };
  /* eslint-enable */
};
