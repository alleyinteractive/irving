const fs = require('fs');
const path = require('path');
const { appRoot } = require('../paths');

/**
 * Get the client available environment variables.
 * @returns {object} - a client safe env object
 */
module.exports = function getEnv() {
  // Avoid missing .env file warning in production environments.
  if (fs.existsSync(path.join(appRoot, '.env'))) {
    require('dotenv').config(); // eslint-disable-line global-require
  }

  // Only include whitelisted variables for client environments to avoid leaking
  // sensitive information.
  const whitelist = [
    new RegExp('NODE_ENV|API_ROOT_URL|DEBUG|ROOT_URL'),
    new RegExp('^API_QUERY_PARAM'),
  ];
  return Object
    .keys(process.env)
    .filter((key) => whitelist.some((regex) => regex.test(key)))
    .reduce((acc, key) => ({
      ...acc,
      [key]: process.env[key],
    }), {});
};
