module.exports = {
  resolve: {
    fallback: {
      // Necessary to prevent sanitize-html from breaking in a browser context.
      path: require.resolve('path-browserify'),
    },
  },
};
