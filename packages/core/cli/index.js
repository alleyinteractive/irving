require('../config/env')();
const { Command } = require('commander');
const program = new Command();

program.command('build')
  .description('run a production build for your Irving app')
  .option(
    '-a --analyze',
    'analyze build results with BundleAnalyzer webpack plugin'
  )
  .action((cmdObj) => {
    process.env.NODE_ENV = 'production';
    require('./build')(cmdObj);
  });

program.command('start')
  .description('start your irving app from a production build')
  .action(() => {
    process.env.NODE_ENV = 'production';
    require('./start');
  });

program.command('dev')
  .description(
    'build your Irving app, watch for changes, and refresh with HMR'
  )
  .action(() => {
    process.env.NODE_ENV = 'development';
    require('./dev');
  });

program.command('link-all')
  .description('npm link all Irving packages installed in your project')
  .action(() => {
    require('../cli/linkAll');
  });

program.parse(process.argv);
