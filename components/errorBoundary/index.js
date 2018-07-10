import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    Fallback: PropTypes.element,
  }

  static defaultProps = {
    Fallback: (
      <h1>
        Something went wrong.
        You may refresh the page or try again later.
      </h1>
    ),
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
