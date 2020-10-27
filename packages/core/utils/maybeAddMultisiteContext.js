/**
 * A utility function that replaces the `ROOT_URL` and `API_ROOT_URL` values
 * in the process.env object.
 * @param {object} env - The current environment configuration.
 * @param {object} context - The multisite context.
 * @param {string} hostname - The hostname to search for.
 * @returns {object} The (possibly) modified environment configuration.
 */
function maybeAddMultisiteContext(env, context, hostname) {
  const modifiedEnv = env;

  if (context) {
    const hostIndex =
      context.map((i) => i.domain).indexOf(hostname);
    const matchedRoot =
      - 1 < hostIndex && context[hostIndex].vars.ROOT_URL === env.ROOT_URL;

    // Only overwrite the process variable if the host exists and the host's
    // `ROOT_URL` var does not match the currently set env `ROOT_URL` value.
    if (! matchedRoot) {
      // Replace vars with those at the current host index.
      modifiedEnv.ROOT_URL = context[hostIndex].vars.ROOT_URL;
      modifiedEnv.API_ROOT_URL = context[hostIndex].vars.API_ROOT_URL;
    }
  }

  return modifiedEnv;
}

module.exports = maybeAddMultisiteContext;
