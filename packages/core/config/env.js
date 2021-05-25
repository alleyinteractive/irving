const fs = require('fs');
const path = require('path');
const { appRoot } = require('./paths');
/**
 * Get the client available environment variables.
 * @returns {object} - a client safe env object
 */
module.exports = function configureEnv() {
  const { env } = process;

  // Production will use environment variables set by the system. We also don't
  // want to execute unnecessary file system calls for optimal performance reasons.
  const isProd = env.NODE_ENV === 'production';
  // Avoid missing .env file warning.
  if (!isProd && fs.existsSync(path.join(appRoot, '.env'))) {
    // Support environment variables set by .env file for development.
    require('dotenv').config(); // eslint-disable-line global-require
  }
};
