import React from 'react';
import PropTypes from 'prop-types';
import getComponent from '../../config/componentMap';

const ErrorMessage = getComponent('error-message');

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return fallback();
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  /**
   * Component children
   */
  children: PropTypes.node.isRequired,
  /**
   * Fallback component if error occurs
   */
  fallback: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  fallback: () => (
    <ErrorMessage />
  ),
};

export default ErrorBoundary;
