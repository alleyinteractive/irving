const fs = require('fs');
const path = require('path');
const { appRoot } = require('../paths');

/**
 * Get the client available environment variables.
 * @returns {object} - a client safe env object
 */
module.exports = function getEnv() {
  // Production will use environment variables set by the system. We also don't
  // want to execute unnecessary file system calls for optimal performance reasons.
  const isProd = 'production' === process.env.NODE_ENV;
  // Avoid missing .env file warning.
  if (! isProd && fs.existsSync(path.join(appRoot, '.env'))) {
    // Support environment variables set by .env file for development.
    require('dotenv').config(); // eslint-disable-line global-require
  }

  // Only include whitelisted variables for client environments to avoid leaking
  // sensitive information.
  const whitelist = [
    // @todo This needs to be handled server-side; stubbing out now to complete MIT-57.
    new RegExp('NODE_ENV|API_ROOT_URL|DEBUG|ROOT_URL|MANDRILL_API_KEY'),
    new RegExp('^API_QUERY_PARAM'),
  ];
  return Object.keys(process.env)
    .filter((key) => whitelist.some((regex) => regex.test(key)))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: process.env[key],
      }),
      {}
    );
};
