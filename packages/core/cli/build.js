const webpack = require('webpack');
const chalk = require('chalk');
const getConfig = require('../config/webpack.config.js');
const config = getConfig({}, { mode: 'production' });

// Compile.
webpack(
  config,
  (err, stats) => {
    // Log fatal webpack errors.
    if (err) {
      if (err.details) {
        throw new Error(err.details);
      } else {
        throw new Error(err.stack || err);
      }
    }

    const info = stats.toJson();

    // Log compile errors.
    if (stats.hasErrors()) {
      throw new Error(info.errors);
    }

    // Log compile warnings.
    if (stats.hasWarnings()) {
      info.warnings.forEach((warning) => {
        console.warn(chalk.yellow(warning));
      });
    }

    console.log('build complete');
  }
);
