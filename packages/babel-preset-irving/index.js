const getTarget = (caller) => (
  (caller && 'babel-loader' === caller.name) ? caller.target : null
);

module.exports = function babelPresetIrving(api) {
  const target = api.caller(getTarget);
  let envConfig;

  // Configure babel preset env based on webpack target.
  switch (target) {
    case 'web':
      envConfig = {
        targets: {
          browsers: 'last 3 versions, IE 11',
        },
        corejs: {
          version: 3,
        },
        useBuiltIns: 'usage',
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

  return {
    sourceType: 'unambiguous',
    plugins: [
      'lodash',
      'react-hot-loader/babel',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      'universal-import',
    ],
    presets: [
      [
        '@babel/env',
        envConfig,
      ],
      '@babel/react',
    ],
  };
};
