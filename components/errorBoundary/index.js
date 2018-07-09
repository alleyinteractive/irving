import React from 'react';
import PropTypes from 'prop-types';
import createDebug from 'services/createDebug';

const debug = createDebug('react');

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    debug(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h1>Something went wrong. Please refresh the page to try again.</h1>
          {this.props.children}
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
