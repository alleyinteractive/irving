/* eslint-disable global-require */
const defaultService = require('./defaultService');
const monitor = require('../monitorService/getService')();
let service;

/**
 * Create a debug logger that will conditionally handle logged errors based on
 * the running environment type.
 *
 * @param {String} namespace The namespace of the error. This is typically the
 *                            module, but the value can be more or less granular
 *                            if desired.
 * @return {function}        A logging function.
 */
const getService = (namespace) => {
  const env = process.env.NODE_ENV;

  // Memoize service, so it can reused.
  if (service) {
    return service;
  }

  const log = require('debug')(namespace); // eslint-disable-line global-require

  // Map all log levels to the same function for browser.
  return Object.keys(defaultService)
    .reduce((acc, method) => {
      acc[method] = (...messages) => {
        messages.forEach((message) => {
          const isErrorMethod = ['emerg', 'crit', 'error'].includes(method);

          if (isErrorMethod) {
            // In development the app should crash fast when encountering any errors.
            if ('development' === env) {
              throw message;
            }

            // Send error to production monitoring service.
            if ('production' === env) {
              if ('string' === typeof message) {
                monitor.logError(new Error(message));
              } else {
                monitor.logError(message);
              }
            }
          } else {
            monitor.logMessage(message);
          }
        });

        log(...messages);
      };

      return acc;
    }, {});
};

module.exports = getService;
