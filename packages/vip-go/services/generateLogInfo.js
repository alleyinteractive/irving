const { format } = require('util');

module.exports = function generateLogInfo(method, messages) {
  const hasTags = messages.find(
    (message) => 'object' === typeof message && message.tags
  );
  // Filter out tags.
  const noTags = messages.filter(
    (message) => (
      'object' !== typeof message ||
      (
        'object' === typeof message &&
        ! message.tags
      )
    )
  );
  const firstMessage = noTags[0];
  let message = firstMessage;
  let info = { tags: {} };

  // If we find tags, send them along.
  if (hasTags) {
    info = {
      tags: hasTags.tags,
    };
  }

  // Format string messages like winston would.
  if (! (firstMessage instanceof Error)) {
    const formattedMessage = format(...noTags);

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
