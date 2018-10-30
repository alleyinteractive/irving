import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from 'components/errorMessage';

class ErrorBoundary extends React.Component {
  static propTypes = {
    /**
     * Component children
     */
    children: PropTypes.node.isRequired,
    /**
     * Fallback component if error occurs
     */
    fallback: PropTypes.func,
  }

  static defaultProps = {
    fallback: () => (
      <ErrorMessage />
    ),
  };

  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children, fallback } = this.props;
    if (this.state.hasError) {
      return fallback();
    }

    return children;
  }
}

export default ErrorBoundary;
