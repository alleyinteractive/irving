const fs = require('fs');
const path = require('path');

// Construct alias roots.
const packages = fs.readdirSync(path.join(__dirname, 'packages'));
const roots = packages.reduce((acc, packageDir) => {
  const packageRoot = path.join('./packages', packageDir, 'src');

  // Anything at the top level of the src diretory will get an alias.
  return [
    ...acc,
    `./${packageRoot}/**`,
  ];
}, []);

module.exports = {
  plugins: [
    'lodash',
    'react-hot-loader/babel',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      { root: roots },
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
