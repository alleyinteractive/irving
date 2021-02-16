// This is a custom Jest transformer turning style imports into empty objects.
module.exports = {
  process() {
    return `
      const React = require('react');
      module.exports = () => React.createElement('svg');
    `;
  },
  getCacheKey() {
    // The output is always the same.
    return 'svgTransform';
  },
};
