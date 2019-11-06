/**
 * Custom media queries
 */
const breakpointValues = {
  xxl: 90,
  xl: 80,
  lg: 64,
  md: 48,
  sm: 32,
};

const breakpointObj = Object.keys(breakpointValues)
  .reduce((acc, curr) => {
    acc[`${curr}Min`] = `min-width: ${breakpointValues[curr]}rem`;
    acc[`${curr}Max`] = `max-width: ${breakpointValues[curr] - 0.0001}rem`;
    acc[`${curr}Val`] = `${breakpointValues[curr]}rem`;
    return acc;
  }, {});

const breakpoints = {
  adminBarMedMin: 'min-width: 783px',
  adminBarSmMin: 'min-width: 601px',
  breakpointValues,
  ...breakpointObj,
};

module.exports.breakpointValues = breakpointValues;
module.exports.breakpointNames = Object.keys(breakpoints).concat('all');
module.exports.breakpoints = breakpoints;
