import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import ErrorBoundary from 'components/errorBoundary';
import Root from 'components/root';
import getComponent from 'config/componentMap';
import getTrackingService from 'services/trackingService';

const ErrorMessage = getComponent('error-message');
const AppContentComponent = getComponent('app');
const trackingService = getTrackingService();

const App = (props) => {
  const { error } = props;

  return (
    <ErrorBoundary>
      {error ? (
        <ErrorMessage />
      ) : (
        <AppContentComponent IrvingApp={Root} />
      )}
    </ErrorBoundary>
  );
};

App.propTypes = {
  /**
   * Was there an error loading the page/components?
   */
  error: PropTypes.bool.isRequired,
  /**
   * React tracking.
   */
  tracking: trackingService.TrackingPropType, // eslint-disable-line react/require-default-props, react/no-unused-prop-types
};

const appMapStateToProps = (state) => ({
  error: !! state.error,
});

const ConnectedApp = connect(appMapStateToProps)(App);

let hotApp; // eslint-disable-line import/no-mutable-exports

if (
  'production_client' === process.env.IRVING_EXECUTION_CONTEXT ||
  'development_client' === process.env.IRVING_EXECUTION_CONTEXT
) {
  hotApp = hot(ConnectedApp);
} else {
  hotApp = ConnectedApp;
}

/** @component */
export default trackingService.track({
  app: 'irving',
  event: 'irving.appLoaded',
  eventContext: 'irving.app',
}, { dispatchOnMount: true })(hotApp);
