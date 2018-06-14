/* eslint-disable no-underscore-dangle */
/**
 * A isomorphic-style-loader context function for the client. This function will
 * apply each encountered style to the browser using <style> tags.
 * @param styles
 */
export const insertCss = (...styles) => {
  // only applicable in the browser
  if (window.document) {
    styles.forEach((style) => (
      style && style._insertCss ? style._insertCss() : false
    ));
  }
};

/**
 * Creates a isomorphic-style-loader context function for the server. This
 * function will push each encountered style to the passed array.
 * @param {array} critical
 * @returns {function}
 */
export const createGetCss = (critical) => (...styles) =>
  styles.forEach((style) => critical.push(style._getCss()));
