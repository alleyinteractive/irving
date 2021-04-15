module.exports = {
  resolve: {
    fallback: {
      // Necessary to prevent sanitize-html from breaking in a browser context.
      buffer: require.resolve('buffer'),
      path: require.resolve('path-browserify'),
      url: require.resolve('native-url'),
    },
  },
};
