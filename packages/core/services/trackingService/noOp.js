/**
 * Return nothing.
 */
const noOp = () => {};

/**
 * Return nothing in a shape that corresponds to tracking hook.
 */
const useTrackingNoOp = () => ({
  trackEvent: noOp,
});

/**
 * Return nothing in a shape that corresponds to tracking wrapper.
 */
const withTrackingNoOpProps = () => ({
  trackEvent: noOp,
  getTrackingData: noOp,
});

module.exports = {
  noOp,
  useTrackingNoOp,
  withTrackingNoOpProps,
};
