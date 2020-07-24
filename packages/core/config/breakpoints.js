const bkptVal = {
  xxl: 90,
  xl: 80,
  lg: 64,
  md: 48,
  sm: 30,
  headerMenu: 58,
};

const breakpoints = Object.keys(bkptVal)
  .reduce((acc, curr) => {
    acc[`${curr}Min`] = `min-width: ${bkptVal[curr]}rem`;
    acc[`${curr}Max`] = `max-width: ${bkptVal[curr] - 0.0001}rem`;
    acc[`${curr}Val`] = `${bkptVal[curr]}rem`;
    return acc;
  }, {});

module.exports = breakpoints;
