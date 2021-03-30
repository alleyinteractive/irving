const webpack = require('webpack');
const chalk = require('chalk');
const getConfig = require('../config/webpack.config.js');

// Compile.
module.exports = (program) => {
  const config = getConfig({}, {
    mode: 'production',
    analyze: program.analyze,
  });

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
        info.errors.forEach((error) => {
          console.error(chalk.red(error.message));
        });

        console.error(chalk.red('build failed'));
        process.exit(1);
      }

      // Log compile warnings.
      if (stats.hasWarnings()) {
        info.warnings.forEach((warning) => {
          console.warn(chalk.yellow(warning.message));
        });
      }

      console.log(stats.toString({ // eslint-disable-line no-console
        colors: true,
      }));
    }
  );
};
