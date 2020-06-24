const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const { appRoot } = require('../../config/paths');
const coreLogService = require('.');


module.exports = getValueFromFiles(
  'services/logService',
  appRoot,
  coreLogService
);
