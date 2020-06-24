const defaultService = require(
  '@irvingjs/core/services/logService/defaultService'
);
const getMonitorService = require('./monitorService');
const monitor = getMonitorService();

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
  let service;

  /* eslint-disable global-require */
  if (
    ! process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const { logger } = require('@automattic/vip-go');
    const log = logger(namespace, {
      silent: 'test' === env,
    });

    // Map log levels to winston log levels in node.
    service = Object.keys(defaultService)
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
                monitor.logError(message);
              }
            }
          });

          log[method](...messages);
        };

        return acc;
      }, {});
  }
  /* eslint-enable */

  return service;
};

module.exports = getService;
