const { getValueFromFiles } = require('./irving/getValueFromFiles');

module.exports = getValueFromFiles(
  'config/proxyPassthrough.js',
  []
);
