/**
 * Custom media queries
 */
const bkptVal = {
  lg: 78.125, // 1250 = desktop
  md: 64, // 1024 = tablet
  sm: 53.125, // 850 = phablet
  xs: 39.375, // 630 = phone
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
