const util = require('util');

/**
 * Utility function to format log info for the Debug package.
 *
 * @param {string} method  The type of message (error/warn/info).
 * @param {array} messages The messages to log.
 * @returns {object}       A formatted object to pass to the debug package.
 */
module.exports = function generateLogInfo(method, messages) {
  const hasKey = (key) => messages.find(
    (message) => typeof message === 'object' && message[key],
  );
  // Allow-listed valid Sentry keys.
  const sentryKeys = [
    'tags',
    'extra',
    'contexts',
  ];

  let info = {};

  // Get the values of keys.
  if (typeof messages === 'object') {
    info = sentryKeys.reduce((acc, key) => {
      const hasVal = hasKey(key);
      if (hasVal) {
        acc[key] = hasVal[key];
      }
      return acc;
    }, {});
  }

  let error = false;

  if (method === 'error') {
    error = !(messages[0] instanceof Error)
      ? new Error(util.format(...messages))
      : messages[0];
  }

  // Construct info object.
  if (error) {
    info = {
      ...info,
      message: [error.message],
      name: error.name,
      stack: error.stack,
    };
  } else {
    info = {
      ...info,
      message: util.format(...messages),
    };
  }

  return {
    level: method,
    ...info,
  };
};
