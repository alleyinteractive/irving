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
    const messageRegExp = /(\([^)]*\))([\s\S]*)/;

    // Log compile errors.
    if (stats.hasErrors()) {
      info.errors.forEach((error) => {
        const errorParts = error.match(messageRegExp);
        console.error( // eslint-disable-line no-console
          chalk.black.bgRed(errorParts[1]),
          chalk.red(errorParts[2])
        );
      });

      process.exitCode = 1;
      throw new Error('build failed');
    }

    console.log(stats.toString({
      colors: true,
      warnings: false,
    }));

    console.log('build complete'); // eslint-disable-line no-console
  }
);
