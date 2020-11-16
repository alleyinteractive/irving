const { getValueFromConfig } = require('./getValueFromConfig');
const getEnv = require('./getEnv');

/**
 * Filter out env vars that are unsafe for rendering in the app.ejs template.
 * Any user-specific data or sensitive information should be filtered out.
 *
 * @param {strin} hostname - The hostname to search for.
 */
const createClientEnv = (hostname) => {
  const env = getEnv(hostname);

  // Only include allowlisted variables for client environments to avoid leaking
  // sensitive information.
  const allowlistArray = getValueFromConfig(
    'clientEnvAllowlist',
    [
      'NODE_ENV',
      'API_ROOT_URL',
      'DEBUG',
      'ROOT_URL',
      'COOKIE_MAP_LIST',
      'FETCH_TIMEOUT',
      'IRVING_EXECUTION_CONTEXT',
    ]
  );
  const allowlist = [
    new RegExp(allowlistArray.join('|')),
    new RegExp('^API_QUERY_PARAM'),
  ];

  return Object
    .keys(env)
    .filter((key) => allowlist.some((regex) => regex.test(key)))
    .reduce((acc, key) => ({
      ...acc,
      [key]: env[key],
    }), {});
};

export default createClientEnv;
