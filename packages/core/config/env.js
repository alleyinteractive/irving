const fs = require('fs');
const path = require('path');
const { appRoot } = require('./paths');
const { getMergedConfigArray } = require('../utils/getConfigValue');

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

  // Only include allowlisted variables for client environments to avoid leaking
  // sensitive information.
  const allowlistArray = getMergedConfigArray('envAllowlist', [
    'NODE_ENV',
    'API_ROOT_URL',
    'DEBUG',
    'ROOT_URL',
    'COOKIE_MAP_LIST',
    'FETCH_TIMEOUT',
  ]);
  const allowlist = [
    new RegExp(allowlistArray.join('|')),
    new RegExp('^API_QUERY_PARAM'),
  ];
  return Object
    .keys(process.env)
    .filter((key) => allowlist.some((regex) => regex.test(key)))
    .reduce((acc, key) => ({
      ...acc,
      [key]: process.env[key],
    }), {});
};
