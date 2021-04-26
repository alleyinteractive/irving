/* eslint-disable global-require */
const defaultService = require('./defaultService');
let service;
let getMonitorService;

if (
  process.env.IRVING_EXECUTION_CONTEXT ||
  'test' === process.env.BABEL_ENV
) {
  getMonitorService = require('@irvingjs/services/monitorService');
} else {
  getMonitorService = require('../monitorService/getServiceFromFilesystem');
}

const monitor = getMonitorService();

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
          if (message instanceof Error) {
            // In development the app should crash fast when encountering any errors.
            if ('development' === env) {
              throw message;
            }

            // Send error to production monitoring service.
            if ('production' === env) {
              // Make sure we're sending an actual error object.
              if (
                ['emerg', 'crit', 'error'].includes(method) &&
                'string' === typeof message
              ) {
                monitor.logError(new Error(message));
              } else {
                monitor.logError(message);
              }
            }
          }
        });

        log(...messages);
      };

      return acc;
    }, {});
};

module.exports = getService;
