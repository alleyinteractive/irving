// Necessary to prevent JSDOM from complaining about a missing canvas module.
module.exports = function Canvas() {
  return null;
};
