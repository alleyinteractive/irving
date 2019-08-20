module.exports = function babelPresetIrving() {
  return {
    plugins: [
      require.resolve('babel-plugin-lodash'),
      require.resolve('react-hot-loader/babel'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('babel-plugin-universal-import'),
    ],
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          targets: {
            browsers: 'last 3 versions, IE 11',
          },
        },
      ],
      require.resolve('@babel/preset-react'),
    ],
  };
}
