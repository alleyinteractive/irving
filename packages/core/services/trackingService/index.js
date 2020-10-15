const { getValueFromConfig } = require('config/irving/getValueFromConfig'); // eslint-disable-line  max-len
const defaultService = require('./defaultService');

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
  service = getValueFromConfig(
    'trackingService',
    defaultService()
  );
  return service;
};

module.exports = getService;
