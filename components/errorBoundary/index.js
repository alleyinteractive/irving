import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from 'components/errorMessage';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
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
    const { hasError } = this.state;

    if (hasError) {
      return fallback();
    }

    return children;
  }
}

export default ErrorBoundary;
