/**
 * Given a string, tests to see if it is a valid URL.
 * @param {string} str - a string to test.
 * @returns {boolean}
 */
const isValidURL = (str) => {
  // eslint-disable-next-line max-len
  const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  return pattern.test(str);
};

module.exports = isValidURL;
