const getValueFromFiles = require('../../config/irving/getValueFromFiles');
const { appRoot } = require('../../config/paths');
const coreMonitorService = require('.');
const defaultMonitorService = require('./defaultService');

/**
 * Get the configured cache service or use core's service.
 */
const getService = () => {
  const service = getValueFromFiles(
    'services/monitorService',
    appRoot,
    coreMonitorService
  )();

  if (! service) {
    return defaultMonitorService;
  }

  return service;
};

module.exports = getService;
