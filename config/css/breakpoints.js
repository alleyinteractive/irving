/**
 * Custom media queries
 */
const bkptVal = {
  lg: 82, // 1312px = desktop
  md: 60, // 960px = tablet
  sm: 40, // 640px = phablet
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
