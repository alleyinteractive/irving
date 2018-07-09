import debug from 'debug';

/**
 * Create a debug logger that will conditionally handle logged errors based on
 * the running environment type.
 *
 * @param {String} namespace  The namespace of the error. This is typically the
 *                            module, but the value can be more or less granular
 *                            if desired.
 * @return {function}         A logging function.
 */
const createDebug = (namespace) => (message) => {
  const env = process.env.NODE_ENV;
  // Don't log during testing.
  if ('test' === env) {
    return;
  }

  // In development the app should crash fast when encountering any errors.
  if (message instanceof Error && 'development' === env) {
    throw message;
  }

  // In production the app should attempt graceful handling of errors, but also
  // log them for easier debugging.
  debug(namespace)(message);
};

export default createDebug;
