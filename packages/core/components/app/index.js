import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RootProviders from 'components/rootProviders';
import ConnectedRoot from 'components/connectedRoot';
import ErrorBoundary from 'components/errorBoundary';
import getRoots from 'selectors/getRoots';
import getProviders from 'selectors/getProviders';
import getComponent from 'config/componentMap';

const ErrorMessage = getComponent('error-message');
const AppContentComponent = getComponent('app');

const App = (props) => {
  const {
    error,
    roots,
    providers,
  } = props;
  const CoreApp = () => (
    <RootProviders providers={providers}>
      {roots.map((name) => (
        <ConnectedRoot key={name} name={name} />
      ))}
    </RootProviders>
  );

  return (
    <ErrorBoundary>
      {error ? (
        <ErrorMessage />
      ) : (
        <AppContentComponent IrvingApp={CoreApp} />
      )}
    </ErrorBoundary>
  );
};

App.propTypes = {
  /**
   * Root component configurations
   */
  roots: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Was there an error loading the page/components?
   */
  error: PropTypes.bool.isRequired,
  /**
   * Root provider configurations
   */
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  roots: getRoots(state),
  providers: getProviders(state),
  error: !! state.error,
});

const withRedux = connect(mapStateToProps);
let hotApp; // eslint-disable-line import/no-mutable-exports

if (
  'production_client' === process.env.IRVING_EXECUTION_CONTEXT ||
  'development_client' === process.env.IRVING_EXECUTION_CONTEXT
) {
  hotApp = hot(withRedux(App));
} else {
  hotApp = withRedux(App);
}

/** @component */
export default hotApp;
