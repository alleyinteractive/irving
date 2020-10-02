const editorConfig = require('../webpack.config');

module.exports = (multiConfig) => (
  [
    ...multiConfig,
    editorConfig,
  ]
);
