const fs = require('fs');
const { maybeResolve } = require('../userModule');

/**
 * Resolve the path to a config file.
 *
 * @param {string} filepath Path to config file we're looking for.
 */
const maybeRequire = (filepath) => {
  const resolvedPath = maybeResolve(filepath);

  if (!fs.existsSync(resolvedPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  } catch (e) {
    return eval(fs.readFileSync(resolvedPath, 'utf8'));
  }
};

module.exports = {
  maybeResolve,
  maybeRequire,
};
