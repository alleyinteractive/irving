/* eslint-disable no-underscore-dangle */
export const insertCss = (...styles) => {
  if (window.document) {
    styles.forEach((style) => (style && style._insertCss ?
      style._insertCss() : false
    ));
  }
};

export const createGetCss = (merged) => (...styles) => styles
  .forEach((style) => merged.push(style._getCss()));
/* eslint-enable */
