const defaultService = require(
  '@irvingjs/core/services/logService/defaultService',
);
const getEnv = require('@irvingjs/core/utils/universalEnv');
const monitor = require('@irvingjs/core/services/monitorService/getService')();
const SentryReact = require('@sentry/react');
const debug = require('debug');
const generateLogInfo = require('./generateLogInfo');

let initialized = false;

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
  let sentryConfig = {};
  let Sentry;

  // Init logger with proper namespace.
  const logger = debug(namespace);

  const {
    NODE_ENV,
    IRVING_APP_ENVIRONMENT,
    IRVING_RENDER_ERRORS,
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
  } = getEnv();

  // Determine if we should log to Sentry.
  const logToSentry = (SENTRY_DSN && NODE_ENV === 'production')
    || (SENTRY_DSN && IRVING_RENDER_ERRORS);

  if (
    !process.env.IRVING_EXECUTION_CONTEXT
    || process.env.IRVING_EXECUTION_CONTEXT === 'production_server'
    || process.env.IRVING_EXECUTION_CONTEXT === 'development_server'
  ) {
    // eslint-disable-next-line global-require
    Sentry = require('@sentry/node');
  } else {
    Sentry = SentryReact;
    // eslint-disable-next-line global-require
    sentryConfig = require('@irvingjs/config/sentryConfig');
  }

  if (logToSentry && !initialized) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: SENTRY_ENVIRONMENT || IRVING_APP_ENVIRONMENT || NODE_ENV,
      ...sentryConfig,
    });
    initialized = true;
  }

  // Map log levels to winston log levels in node.
  service = Object.keys(defaultService)
    .reduce((acc, method) => {
      acc[method] = (...messages) => {
        // Construct log info object & log it with debug.
        const logInfo = generateLogInfo(method, messages);
        logger(...logInfo.message);

        // Log stack to the console if we have an error.
        if (logInfo.stack) {
          logger(logInfo.stack);
        }

        // If we have an error, do a couple more things with it.
        if (logInfo.level === 'error') {
          const err = new Error(logInfo.message);

          if (logToSentry) {
            Sentry.withScope((scope) => {
              scope.setLevel('error');
              Sentry.captureException(err, {
                contexts: logInfo.contexts,
                extra: logInfo.extra,
                tags: logInfo.tags,
              });
            });
          }

          if (NODE_ENV === 'development' && !IRVING_RENDER_ERRORS) {
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

  return service;
};

module.exports = getService;
