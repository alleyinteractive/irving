const { format } = require('util');
const { URL } = require('url');
const isValidURL = require('../util/isValidURL');

module.exports = function generateLogInfo(method, messages) {
  const hasUrl = messages.filter((message) => isValidURL(message));
  const firstMessage = messages[0];
  let message = firstMessage;
  let info = {
    href: null,
    search: null,
  };

  // If we find a url, send along the query string.
  if (hasUrl.length) {
    const url = new URL(hasUrl[0]);
    info = {
      href: url.href,
      search: url.search,
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
