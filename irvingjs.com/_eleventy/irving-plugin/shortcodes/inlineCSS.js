const path = require('path');
const paths = require('../paths');
const processStyles = require('../../processStyles');

/**
 * Process Sass and return a style tag for inline styles.
 *
 * @param  {string} file The Sass filepath.
 * @return {string}      A style tag with inline CSS.
 */
module.exports = async function(file) {
  const filePath = path.resolve(paths.root, file);
  return `<style>${await processStyles(filePath, true)}</style>`;
}
