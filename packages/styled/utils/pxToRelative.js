// Convert a pixel value to a relative one using a base font size.
const pxToRelative = (value, base, unit) => (
  `${parseFloat(value) / base}${unit}`
);

export default pxToRelative;
