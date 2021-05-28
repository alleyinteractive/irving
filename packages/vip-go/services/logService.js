const defaultService = require(
  '@irvingjs/core/services/logService/defaultService',
);
const getEnv = require('@irvingjs/core/utils/universalEnv');
const monitor = require('@irvingjs/core/services/monitorService/getService')();

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
  let service = defaultService;

  /* eslint-disable global-require */
  // This is still required for log service, as core expects the log service to be isomorphic.
  if (
    !process.env.IRVING_EXECUTION_CONTEXT
    || process.env.IRVING_EXECUTION_CONTEXT === 'production_server'
    || process.env.IRVING_EXECUTION_CONTEXT === 'development_server'
  ) {
    const {
      ROOT_URL,
      NODE_ENV,
      IRVING_APP_ENVIRONMENT,
      SENTRY_DSN,
      SENTRY_ENVIRONMENT,
    } = getEnv();
    const generateLogInfo = require('./generateLogInfo');
    const { format } = require('winston');
    let transport;

    // Set up sentry transport.
    if (
      SENTRY_DSN
      && NODE_ENV === 'production'
    ) {
      const SentryTransport = require('winston-transport-sentry-node').default;
      const sentryFormat = format((info) => {
        const {
          app_type: appType,
          tags,
          ...extra
        } = info;

        return {
          ...extra,
          tags: {
            ...tags,
            source: appType,
          },
        };
      });

      transport = new SentryTransport({
        sentry: {
          environment: IRVING_APP_ENVIRONMENT || SENTRY_ENVIRONMENT || NODE_ENV,
          serverName: ROOT_URL,
        },
        format: sentryFormat(),
        level: 'warn', // only log at warn and above.
      });
    }

    // Set up the logger.
    const { logger } = require('@automattic/vip-go');
    const log = logger(namespace, {
      silent: NODE_ENV === 'test',
      transport,
    });

    // Map log levels to winston log levels in node.
    service = Object.keys(defaultService)
      .reduce((acc, method) => {
        acc[method] = (...messages) => {
          // Construct log info object and send it to winston.
          const logInfo = generateLogInfo(method, messages);
          log[method](logInfo);

          // If we have an error, do a couple more things with it.
          if (logInfo.level === 'error') {
            const err = new Error(logInfo.message);

            if (NODE_ENV === 'development') {
              // In development the app should crash fast when encountering any errors.
              throw err;
            }

            // Send error to production monitoring service.
            if (NODE_ENV === 'production') {
              monitor.logError(err);
            }
          }
        };

        return acc;
      }, {});
  }
  /* eslint-enable */

  return service;
};

module.exports = getService;
