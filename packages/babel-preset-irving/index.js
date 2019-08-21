module.exports = function babelPresetIrving() {
  return {
    plugins: [
      'babel-plugin-lodash',
      'react-hot-loader/babel',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-universal-import',
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: 'last 3 versions, IE 11',
          },
        },
      ],
      '@babel/preset-react',
    ],
  };
};
