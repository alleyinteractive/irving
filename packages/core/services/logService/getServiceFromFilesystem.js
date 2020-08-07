const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const coreLogService = require('.');

module.exports = (namespace) => (
  getValueFromFiles(
    'services/logService',
    coreLogService
  )(namespace)
);
