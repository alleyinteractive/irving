const getService = require('./monitorService');
const monitor = getService();

/**
 * Create a debug logger that will conditionally handle logged errors based on
 * the running environment type.
 *
 * @param {String} namespace  The namespace of the error. This is typically the
 *                            module, but the value can be more or less granular
 *                            if desired.
 * @return {function}         A logging function.
 */
const createDebug = (namespace) => (level, ...messages) => {
  let log;
  const env = process.env.NODE_ENV;

  /* eslint-disable global-require */
  if (! process.env.BROWSER) {
    const { logger } = require('@automattic/vip-go');
    log = logger(namespace, {
      silent: 'test' === env,
    })[level];
  } else {
    log = require('debug')(namespace);
  }
  /* eslint-enable */

  // In development the app should crash fast when encountering any errors.
  messages.forEach((message) => {
    if (message instanceof Error && 'development' === env) {
      throw message;
    }
  });

  // Send error to production monitoring service.
  // if ('production' === env) {
  monitor.logError();
  // }

  // In production the app should attempt graceful handling of errors, but also
  // log them for easier debugging.
  log(...messages);
};

module.exports = createDebug;
