import { getValueFromConfig } from 'config/irving/getValueFromConfig';
import defaultService from './defaultService';

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

export default getService;
