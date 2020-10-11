import track, { TrackingPropType, useTracking } from 'react-tracking';

let service;

/**
 * Get the react-tracking service.
 */
const getService = () => {
  service = {
    hoc: track,
    hook: useTracking,
    trackingPropTypes: {
      tracking: TrackingPropType,
    },
    // options: {
    //   dataLayer: config...,
    // },
  };

  return service;
};

export default getService;
