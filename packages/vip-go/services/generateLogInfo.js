const { format } = require('util');

module.exports = function generateLogInfo(method, messages) {
  const hasKey = (key) => messages.find(
    (message) => typeof message === 'object' && message[key],
  );

  const hasTags = hasKey('tags');
  const hasAdditionalData = hasKey('additionalData');

  // Filter out tags and additionalData (objects).
  const noTagsOrData = messages.filter(
    (message) => (
      typeof message !== 'object'
      || (
        typeof message === 'object'
        && !message.tags
        && !message.additionalData
      )
    ),
  );

  let message = noTagsOrData[0];

  let info = {
    tags: hasTags ? hasTags.tags : {},
  };

  if (hasAdditionalData) {
    info = {
      ...hasAdditionalData.additionalData,
      ...info,
    };
  }

  // Format string messages like winston would.
  if (!(message instanceof Error)) {
    const formattedMessage = format(...noTagsOrData);

    // error logged, but message isn't a string.
    if (method === 'error') {
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
