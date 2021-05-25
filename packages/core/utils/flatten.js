/**
 * Flattens child objects into top-level object.
 * @param {object} obj
 * @returns {object}
 */
function flatten(obj) {
  return Object.keys(obj)
    .reduce(
      (acc, curr) => (
        { ...acc, ...obj[curr] }
      ), {},
    );
}

// Support importing module from NodeJS context.
module.exports = flatten;
