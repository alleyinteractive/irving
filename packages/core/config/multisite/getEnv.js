const { getSiteConfig } = require('./getSiteConfig');
const getEnv = require('../../utils/universalEnv');

/**
 * A utility function that replaces the `ROOT_URL` and `API_ROOT_URL` values
 * in the process.env object.
 * @param {string} hostname - The hostname to search for.
 * @returns {object} env object, with site-specific values if available.
 */
module.exports = (hostname = window.location.hostname) => {
  const env = getEnv(); // eslint-disable-line no-underscore-dangle
  const siteConfig = getSiteConfig(hostname);

  if (! siteConfig) {
    return env;
  }

  const multisiteEnv = {
    ...env,
    ...siteConfig.env,
  };

  return multisiteEnv;
};
