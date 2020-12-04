const sass = require('dart-sass')
const postcss = require('postcss')
const cssnano = require('cssnano')
const units = require('postcss-units')
const autoprefixer = require('autoprefixer')
const paths = require('./lede-plugin/paths');

/**
 * Process Sass styles.
 *
 * @param  {string} inputFile Absolute path to the input file.
 * @return {string}           Processed CSS.
 */
module.exports = async function(inputFile) {
  const { css } = await sass.renderSync({
    file: inputFile,
    includePaths: [
      paths.scss,
    ]
  });

  return postcss([
      units(),
      autoprefixer(),
      cssnano(),
    ])
    .process(css.toString(), { from: inputFile })
    .then((result) => {
      result.warnings().forEach(warn => {
        console.warn(warn.toString());
      });

      return result.css;
    });
}
