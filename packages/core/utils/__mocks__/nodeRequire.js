const path = require('path');
const fs = require('fs');

/**
 * Resolve the path to a config file.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 */
const maybeRequire = (filepath, base) => {
  const resolvedPath = path.resolve(base, filepath);

  if (! fs.existsSync(resolvedPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  } catch (e) {
    return eval(fs.readFileSync(resolvedPath, 'utf8'));
  }
};

module.exports = {
  maybeRequire,
};
