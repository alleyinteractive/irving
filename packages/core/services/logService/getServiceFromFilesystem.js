const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const { appRoot } = require('../../config/paths');
const coreLogService = require('.');

/**
 * Get the configured cache service or use core's service.
 */
const logService = () => (
  getValueFromFiles(
    'services/logService',
    appRoot,
    coreLogService
  )
);

module.exports = logService;
