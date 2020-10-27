const { track, TrackingPropType, useTracking } = require('react-tracking');

module.exports = () => ({
  withTracking: track,
  useTracking,
  trackingPropTypes: {
    tracking: TrackingPropType,
  },
});
