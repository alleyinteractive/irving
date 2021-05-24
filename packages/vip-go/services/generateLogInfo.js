const { format } = require('util');

module.exports = function generateLogInfo(method, messages) {
  const url = messages.find(
    (message) => 'object' === typeof message && message.url
  );
  const firstMessage = messages[0];
  let message = firstMessage;
  let info = {
    url: null,
  };

  // If we find a url, send it along.
  if (url) {
    info = {
      url,
    };
  }

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
      ...info,
      message: message.message,
      name: message.name,
      stack: message.stack,
    };
  } else {
    info = { ...info, message };
  }

  return {
    level: method,
    ...info,
  };
};
