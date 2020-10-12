const getTrackingService = require('./getServiceFromFilesystem');
const getReactTrackingService = require('./reactTrackingService');
let service;

/**
 * Create a tracker that will handle the events baked into Irving components.
 *
 * @return {function} A tracking function.
 */
const getService = () => {
  // Memoize service, so it can reused.
  if (service) {
    return service;
  }
  const testing = true;
  if (testing) {
    service = getReactTrackingService();
    return service;
  }
  service = getTrackingService();
  return service;
};

module.exports = getService;
