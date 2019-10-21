// Convert a pixel value to a relative one using a base font size.
const pxToRelative = (value, unit, base) => (
  `${parseFloat(value) / base}${unit}`
);

export default pxToRelative;
