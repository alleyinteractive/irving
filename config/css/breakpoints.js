/**
 * Custom media queries
 */
const bkptVal = {
  xl: 80,
  lg: 64,
  md: 48,
  sm: 32,
};

const breakpoints = Object.keys(bkptVal)
  .reduce((acc, curr) => {
    acc[`${curr}Min`] = `(min-width: ${bkptVal[curr]}rem)`;
    acc[`${curr}Max`] = `(max-width: ${bkptVal[curr] - 0.0001}rem)`;
    acc[`${curr}Val`] = `${bkptVal[curr]}rem`;
    return acc;
  }, {});

module.exports = Object.assign({}, {
  adminBarMedMin: '(min-width: 783px)',
  adminBarSmMin: '(min-width: 601px)',
  bkptVal,
}, breakpoints);
