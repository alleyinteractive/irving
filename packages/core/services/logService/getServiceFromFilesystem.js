const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const coreLogService = require('./index');

module.exports = (namespace) => (
  getValueFromFiles(
    'services/logService',
    coreLogService
  )(namespace)
);
