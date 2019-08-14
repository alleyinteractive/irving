// Plugins
const calc = require('postcss-calc');
const cssImport = require('postcss-import');
const variables = require('postcss-simple-vars');
const nested = require('postcss-nested');
const units = require('postcss-units');
const colorFunction = require('postcss-color-function');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-sassy-mixins');
const focus = require('postcss-focus');
const stylelint = require('stylelint');
const browserReporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');
const prependImports = require('postcss-prepend-imports');
const tidyColumns = require('postcss-tidy-columns');

// Other imports
const paths = require('./paths');
const stylelintConfig = require('./stylelint.config.js');
const cssVars = require('./css');
const flatten = require('../utils/flatten');

// Config
module.exports = () => ({
  plugins: [
    stylelint(stylelintConfig),
    prependImports({
      path: paths.globalStyles,
      files: ['mixins/index.css'],
    }),
    cssImport({
      path: [paths.globalStyles],
    }), // Import files
    mixins(),
    variables({
      variables: flatten(cssVars),
    }),
    units(), // Compute rem() function
    nested(), // Allow nested syntax.
    calc({
      mediaQueries: true,
    }),
    colorFunction(),
    tidyColumns({
      columns: 10,
      gap: '1rem',
      edge: '1.25rem',
      siteMax: '78.125rem',
      breakpoints: {
        '78.125rem': {
          columns: 12,
          edge: '1.25rem',
          gap: '1rem',
        },
      },
    }),
    focus(),
    autoprefixer({
      flexbox: 'no-2009',
    }),
    browserReporter(),
    reporter(),
  ],
});
