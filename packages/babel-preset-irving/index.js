module.exports = function babelPresetIrving() {
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
        {
          targets: {
            browsers: 'last 3 versions, IE 11',
          },
          corejs: {
            version: 3,
          },
          useBuiltIns: 'usage',
        },
      ],
      '@babel/react',
    ],
  };
};
