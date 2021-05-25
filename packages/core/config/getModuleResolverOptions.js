const path = require('path');
const fs = require('fs');
const { buildContext } = require('./paths');
const getServiceAliases = require('./irving/getServiceAliases');
const aliases = require('./aliases');
const scopeDir = path.join(__dirname, '../../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));

module.exports = (target) => ({
  root: [
    buildContext,
    ...packageRoots,
  ],
  cwd: 'packagejson',
  alias: {
    ...getServiceAliases(target),
    ...aliases,
  },
});
