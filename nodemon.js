const nodemon = require('nodemon');
const utils = require('nodemon/lib/utils');
const {
  flow,
  get,
  isEqual,
  intersection,
} = require('lodash/fp');

const ignore = [
  'actions/*',
  'client/*',
  'components/*',
  'config/*',
  'reducers/*',
  'sagas/*',
  'selectors/*',
  'server/serverRenderer.js',
  'services/*',
  'utils/*',
];

nodemon({
  script: 'server/index.js',
  ignore,
});

const getIgnore = get('config.options.ignore');
const isIgnoreApplied = flow(getIgnore, intersection(ignore), isEqual(ignore));

nodemon.on('crash', () => {
  if (isIgnoreApplied(nodemon)) {
    nodemon.config.load({ script: 'server/index.js' }, () => {
      utils.log.info('Nodemon is temporarily watching all directories for a' +
        ' file change to resolve the error.');
    });
  }
});

nodemon.on('restart', () => {
  if (! isIgnoreApplied(nodemon)) {
    nodemon.config.load({ script: 'server/index.js', ignore }, () => {
      utils.log.info('Nodemon has continued to ignore directories where front' +
        ' end changes may occur.');
    });
  }
});

nodemon.on('log', (message) => {
  if (message.error) {
    console.error(message.colour); // eslint-disable-line no-console
  } else {
    console.log(message.colour); // eslint-disable-line no-console
  }
});
