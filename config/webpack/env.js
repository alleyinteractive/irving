/**
 * Get the client available environment variables.
 * @param {string} context - the configuration context
 * @returns {object} - a client safe env object
 */
module.exports = function getEnv(context) {
  const isProd = context.includes('production');
  // Avoid missing .env file warning in production environments.
  if (! isProd) {
    require('dotenv').config(); // eslint-disable-line global-require
  }

  // Only include whitelisted variables for client environments to avoid leaking
  // sensitive information.
  const whitelist = [
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
