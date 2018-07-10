import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from 'components/errorMessage';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    Fallback: PropTypes.element,
  }

  static defaultProps = {
    Fallback: ErrorMessage,
  };

  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children, Fallback } = this.props;
    if (this.state.hasError) {
      return (
        <Fallback />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
