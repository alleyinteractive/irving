const getTarget = (caller) => {
  if (caller && 'babel-loader' === caller.name) {
    return caller.es5 ? 'es5' : caller.target;
  }

  return null;
};

module.exports = function babelPresetIrving(api) {
  const target = api.caller(getTarget);
  let envConfig;

  // Configure babel preset env based on webpack target.
  switch (target) {
    case 'modules':
      envConfig = {
        targets: {
          esmodules: true,
        },
        modules: false,
      };
      break;

    case 'es5':
      envConfig = {
        targets: {
          browsers: '> 0.25%',
          ie: 11,
        },
        corejs: {
          version: 3,
        },
        useBuiltIns: 'entry',
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
