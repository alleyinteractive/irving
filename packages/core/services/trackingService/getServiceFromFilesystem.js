// const getValueFromFiles = require('../../config/irving/getValueFromFiles');
// const coreTrackingService = require('.');
const getDefaultService = require('./defaultService');

/**
 * Get the configured tracking service or use core's service.
 */
const getService = () => getDefaultService();

module.exports = getService;
