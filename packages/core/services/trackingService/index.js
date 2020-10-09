import track, { TrackingPropType, useTracking } from 'react-tracking';

let service;

/**
 * Get the reusable react-tracking service. This prevents us from having
 * multiple instances throughout the app.
 *
 * @returns {object} singleton service object
 */
const getService = () => {
  // Memoize service, so it can reused.
  if (service) {
    return service;
  }

  service = {
    track,
    TrackingPropType,
    useTracking,
  };

  return service;
};

module.exports = getService;
