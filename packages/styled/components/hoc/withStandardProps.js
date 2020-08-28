import React from 'react';
import PropTypes from 'prop-types';

const withThemes = () => (WrappedComponent) => {
  const ComponentWithProps = (props) => {
    const {
      themeName,
      style,
    } = props;

    return (
      <WrappedComponent {...props} />
    );
  };

  ComponentWithProps.propTypes = {
    /**
     * CSS style.
     */
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  ComponentWithProps.defaultProps = {
    themeName: 'default',
    style: {},
  };

  return ComponentWithProps;
};

/** @component */
export default withThemes;
