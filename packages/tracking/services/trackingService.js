const { track, TrackingPropType, useTracking } = require('react-tracking');

console.log('$$$$$$$$$$$$$$$$ BUTTS');

module.exports = () => ({
  withTracking: track,
  useTracking,
  trackingPropTypes: {
    tracking: TrackingPropType,
  },
});
