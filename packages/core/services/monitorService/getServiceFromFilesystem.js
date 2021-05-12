const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const coreMonitorService = require('./index');
const getDefaultService = require('./defaultService');

/**
 * Get the configured cache service or use core's service.
 */
const getService = () => {
  const service = getValueFromFiles(
    'services/monitorService',
    coreMonitorService
  )();

  if (! service) {
    return getDefaultService();
  }

  return service;
};

module.exports = getService;
