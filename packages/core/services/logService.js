const getMonitorService = require('./monitorService');
const monitor = getMonitorService();
/* eslint-disable no-console */
const defaultService = {
  emerg: console.error,
  alert: console.error,
  crit: console.error,
  error: console.error,
  warning: console.warn,
  notice: console.log,
  info: console.info,
  debug: console.debug,
};
/* eslint-enable */

/**
 * Create a debug logger that will conditionally handle logged errors based on
 * the running environment type.
 *
 * @param {String} namespace  The namespace of the error. This is typically the
 *                            module, but the value can be more or less granular
 *                            if desired.
 * @return {function}         A logging function.
 */
const getService = (namespace) => {
  const env = process.env.NODE_ENV;
  const log = require('debug')(namespace); // eslint-disable-line global-require

  // Map all log levels to the same function for browser.
  return Object.keys(defaultService)
    .reduce((acc, method) => {
      acc[method] = (...messages) => {
        // In development the app should crash fast when encountering any errors.
        if ('development' === env) {
          messages.forEach((message) => {
            if (message instanceof Error) {
              throw message;
            }
          });
        }

        // Send error to production monitoring service.
        if ('production' === env) {
          monitor.logError();
        }

        log(...messages);
      };

      return acc;
    }, {});
};

module.exports = getService;
