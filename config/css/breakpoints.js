/**
 * Custom media queries
 */
const bkptVal = {
  lg: 82, // 1312 = desktop
  md: 60, // 960 = tablet
  sm: 39.375, // 630= phone
};

const breakpoints = Object.keys(bkptVal).reduce((acc, curr) => {
  acc[`${curr}Min`] = `min-width: ${bkptVal[curr]}rem`;
  acc[`${curr}Max`] = `max-width: ${bkptVal[curr] - 0.0001}rem`;
  acc[`${curr}Val`] = `${bkptVal[curr]}rem`;
  return acc;
}, {});

module.exports = Object.assign(
  {},
  {
    bkptVal,
  },
  breakpoints
);
