const mock = require('mock-fs');
const path = require('path');
const testPackage = path.join(
  process.cwd(),
  'node_modules/@irvingjs/test-package'
);
const testPackageTwo = path.join(
  process.cwd(),
  'node_modules/@irvingjs/test-package-two'
);

module.exports = () => {
  mock({
    [path.join(process.cwd(), 'package.json')]: JSON.stringify({
      dependencies: {
        '@irvingjs/test-package': '0.0.0',
        '@irvingjs/test-package-two': '0.0.0',
        '@irvingjs/test-package-three': '0.0.0',
      },
    }),
    [path.join(testPackage, 'test.js')]: JSON.stringify({ field: 'test' }),
    [path.join(testPackage, 'services/cacheService.js')]: 'cacheService',
    [path.join(testPackageTwo, 'services/logService.js')]: 'logService',
    [path.join(testPackageTwo, 'test.js')]: JSON.stringify({ field: 'test two' }),
    [path.join(process.cwd(), 'test.js')]: JSON.stringify({ fieldTwo: 'another test' }),
    [path.join(process.cwd(), 'test-function.js')]: '() => { \'this is a test\' }',
    [path.join(testPackage, 'test-function.js')]: '() => { \'this is another test\' }',
  });
};
