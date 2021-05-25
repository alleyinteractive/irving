const path = require('path');
const nodemon = require('nodemon');
const utils = require('nodemon/lib/utils');
const {
  flow,
  get,
  intersection,
  isEqual,
} = require('lodash/fp');

// By default we want nodemon to ignore any files that contain isomorphic code,
// so that if a change in the file occurs the dev server doesn't restart. That
// would break HMR and force you to reload the page.
const ignore = [
  'actions/*',
  'client/*',
  'components/*',
  'config/*',
  'reducers/*',
  'sagas/*',
  'selectors/*',
  'server/serverRenderer.jsx',
  'server/getAppTemplateVars.jsx',
  'server/getErrorTemplateVars.jsx',
  'services/*',
  'styles/*',
  'utils/*',
  'hooks/*',
  'irving.config.js',
  'componentMap.js',
];
const script = path.join(__dirname, './start.js');

nodemon({ script, ignore });

const getIgnore = get('config.options.ignore');
const isIgnoreApplied = flow(getIgnore, intersection(ignore), isEqual(ignore));

nodemon.on('crash', () => {
  // When an error has occurred on the server, wait for any change in the
  // project to restart the app.
  if (isIgnoreApplied(nodemon)) {
    nodemon.config.load({ script }, () => {
      utils.log.info('Nodemon is temporarily watching all directories for a'
        + ' file change to resolve the error.');
    });
  }
});

nodemon.on('restart', () => {
  // If the app has successfully restarted, make sure that we are ignore the
  // isomorphic code directories again.
  if (!isIgnoreApplied(nodemon)) {
    nodemon.config.load({ script, ignore }, () => {
      utils.log.info('Nodemon has continued to ignore directories where front'
        + ' end changes may occur.');
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
