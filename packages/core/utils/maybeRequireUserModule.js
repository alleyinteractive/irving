const path = require('path');
const { appRoot, irvingRoot } = require('../config/paths');

/* eslint-disable import/no-dynamic-require, global-require */
module.exports = function maybeRequireUserModule(userPath, corePath) {
  let requiredModule;
  const defaultPath = corePath || userPath;

  try {
    requiredModule = require(path.join(appRoot, userPath));
  } catch (e) {
    requiredModule = require(path.join(irvingRoot, defaultPath));
  }

  return requiredModule;
};
/* eslint-enable */
