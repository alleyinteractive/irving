import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorBoundary from 'components/errorBoundary';
import Root from 'components/root';
import getComponent from 'config/componentMap';

const ErrorMessage = getComponent('error-message');
const AppContentComponent = getComponent('app');

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
};

const appMapStateToProps = (state) => ({
  error: !! state.error,
});

export default connect(appMapStateToProps)(App);
