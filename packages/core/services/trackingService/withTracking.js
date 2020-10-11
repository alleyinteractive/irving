const React = require('react');
const hoistNonReactStatic = require('hoist-non-react-statics');
const noOp = require('./noOp');

function withTracking(...trackingOptions) {
  return (DecoratedComponent) => {
    const decoratedComponentName =
      DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
    function WithTracking({ ...props }) {
      return (
        <DecoratedComponent
          {...props}
          tracking={noOp.withTrackingNoOpProps(trackingOptions)}
        />
      );
    }
    WithTracking.displayName = `WithTracking(${decoratedComponentName})`;
    hoistNonReactStatic(WithTracking, DecoratedComponent);
    return WithTracking;
  };
}

module.exports = withTracking;
