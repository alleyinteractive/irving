import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorBoundary from 'components/errorBoundary';
import Root from 'components/root';
import getComponent from 'config/componentMap';
import getTrackingService from 'services/trackingService';
import { getValueFromConfig } from 'config/irving/getValueFromConfig';

const ErrorMessage = getComponent('error-message');
const RouteInvalid = getComponent('route-invalid-message');
const AppContentComponent = getComponent('app');
const trackingService = getTrackingService();

const App = (props) => {
  const { apiValid, error } = props;

  /**
   * If the API URL is invalid, return early as only bad things happen from here.
   */
  if (!apiValid) {
    return (
      <ErrorBoundary>
        <RouteInvalid />
      </ErrorBoundary>
    );
  }

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
   * Tracking prop types.
   */
  ...trackingService.trackingPropTypes,
};

const appMapStateToProps = (state) => ({
  error: !!state.error,
  apiValid: state.route.apiValid,
});

export default connect(appMapStateToProps)(trackingService.withTracking(
  {
    app: 'irving',
    event: 'irving.appLoaded',
    eventContext: 'irving.app',
  },
  {
    dispatchOnMount: true,
    ...getValueFromConfig('trackingOptions', {}),
  },
)(App));
