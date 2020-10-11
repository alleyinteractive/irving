const PropTypes = require('prop-types');
const withTracking = require('./withTracking');
const noOp = require('./noOp');

module.exports = () => ({
  withTracking,
  useTracking: noOp.useTrackingNoOp,
  trackingPropTypes: {
    tracking: PropTypes.shape({
      trackEvent: PropTypes.func,
      getTrackingData: PropTypes.func,
    }),
  },
});
