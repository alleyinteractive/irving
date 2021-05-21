/**
 * Given a mixed value, tests to see if it is a valid URL.
 * @param {mixed} val - a value to test.
 * @returns {boolean}
 */
const isValidURL = (val) => {
  try {
    const url = new URL(val);
    /**
         * Make sure we have an actual protocol.
         * Otherwise, something like "error: some string" will return true.
         */
    return ['https:', 'http:'].includes(url.protocol);
  } catch (err) {
    return false;
  }
};

module.exports = isValidURL;
