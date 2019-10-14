const webpack = require('webpack');
const getConfig = require('../config/webpack.config.js');
const config = getConfig({}, { mode: 'production' });

// Compile.
webpack(
  config,
  (err, stats) => {
    // Log fatal webpack errors.
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    // Log compile errors.
    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    // Log compile warnings.
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log('build complete');
  }
);
