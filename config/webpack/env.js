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
  const allowedKeys = [
    'NODE_ENV',
    'API_ROOT_URL',
    'DEBUG',
    'ROOT_URL',
    'NEXUS_ROOT_URL',
    'ONETRUST_ENABLE',
  ];
  const whitelist = [
    new RegExp(allowedKeys.join('|')),
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
