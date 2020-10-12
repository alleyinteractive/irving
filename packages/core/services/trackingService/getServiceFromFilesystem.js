// const getValueFromFiles = require('../../config/irving/getValueFromFiles');
// const coreTrackingService = require('.');
const getDefaultService = require('./defaultService');

/**
 * Get the configured tracking service or use core's service.
 */
const getService = () => getDefaultService();
// @todo Trying to figure out why this causes an error with the `fs` module.
//  ERROR in /Users/davisshaver/irving/packages/core/config/paths.js
//     Module not found: Error: Can't resolve 'fs' in '/Users/davisshaver/irving/packages/core/config'
//      @ /Users/davisshaver/irving/packages/core/config/paths.js 14:9-22
//      @ /Users/davisshaver/irving/packages/core/config/irving/getValueFromFiles.js
//      @ /Users/davisshaver/irving/packages/core/services/trackingService/getServiceFromFilesystem.js
//      @ /Users/davisshaver/irving/packages/core/services/trackingService/index.js
//      @ /Users/davisshaver/irving/packages/core/components/app/index.js
//      @ /Users/davisshaver/irving/packages/core/client/index.js
//      @ multi regenerator-runtime/runtime abort-controller/polyfill whatwg-fetch webpack-hot-middleware/client?reload=true /Users/davisshaver/irving/packages/core/client
//
// I see the logging service used in the Pico component so I'm trying to figure
//  out what the difference might be.
// const getService = () => {
//   const service = getValueFromFiles(
//     'services/trackingService',
//     coreTrackingService
//   )();
//
//   if (! service) {
//     return getDefaultService();
//   }
//
//   return service;
// };

module.exports = getService;
