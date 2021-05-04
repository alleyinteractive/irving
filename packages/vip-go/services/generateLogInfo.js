const { format } = require('util');

module.exports = function generateLogInfo(method, messages) {
  const firstMessage = messages[0];
  let message = firstMessage;
  let info;

  // Format string messages like winston would.
  if (! (firstMessage instanceof Error)) {
    const formattedMessage = format(...messages);

    // error logged, but message isn't a string.
    if ('error' === method) {
      message = new Error(formattedMessage);
    } else {
      message = formattedMessage;
    }
  }

  // Construct info object.
  if (message instanceof Error) {
    info = {
      message: firstMessage.message,
      name: firstMessage.name,
      stack: firstMessage.stack,
    };
  } else {
    info = { message };
  }

  return {
    level: method,
    ...info,
  };
};
