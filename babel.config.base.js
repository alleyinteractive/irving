const fs = require('fs');
const path = require('path');

module.exports = {
  plugins: [
    'lodash',
    'react-hot-loader/babel',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      { root: ['./**'] },
    ],
    'universal-import',
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: 'last 3 versions, IE 11',
        },
      },
    ],
    '@babel/react',
  ],
};
