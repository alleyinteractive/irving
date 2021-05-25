const React = require('react');
const noOp = require('./noOp');

/**
 * Add tracking prop to component. Statics not hoisted at present.
 *
 * @param trackingOptions
 * @returns {function} With tracking HOC.
 */
/* eslint-disable react/jsx-props-no-spreading */
function withTracking(...trackingOptions) {
  return (DecoratedComponent) => {
    const decoratedComponentName = DecoratedComponent.displayName
      || DecoratedComponent.name
      || 'Component';
      function WithTracking({ ...props }) {
      return (
        <DecoratedComponent
          {...props}
          tracking={noOp.withTrackingNoOpProps(trackingOptions)}
        />
      );
    }
    WithTracking.displayName = `WithTracking(${decoratedComponentName})`;
    return WithTracking;
  };
}
/* eslint-enable */

module.exports = withTracking;
