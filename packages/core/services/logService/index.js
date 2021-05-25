/* eslint-disable global-require */
const { format } = require('util');
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
        const messageFormatted = format(...messages);

        if (method === 'error') {
          const firstMessage = messages[0];
          const message = (firstMessage instanceof Error)
            ? firstMessage : new Error(messageFormatted);

          // In development the app should crash fast when encountering any errors.
          if (env === 'development') {
            throw message;
          }

          // Send error to production monitoring service.
          if (env === 'production') {
            monitor.logError(message);
          }
        } else {
          monitor.logMessage(messageFormatted);
        }

        log(...messages);
      };

      return acc;
    }, {});
};

module.exports = getService;
