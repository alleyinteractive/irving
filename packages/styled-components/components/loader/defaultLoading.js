import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './spinner';

const DefaultLoading = (props) => {
  const {
    className,
    children,
    spinnerProps,
    theme,
  } = props;
  const { LoadingWrapper } = theme;

  return (
    <LoadingWrapper
      data-testid="loading"
      className={className}
    >
      {children || (
        <Spinner
          {...spinnerProps}
          theme={theme}
        />
      )}
    </LoadingWrapper>
  );
};

DefaultLoading.defaultProps = {
  className: '',
  children: false,
  spinnerProps: {},
};

DefaultLoading.propTypes = {
  /**
   * Additional classname to add to loading component wrapper.
   * default: ''
   */
  className: PropTypes.string,
  /**
   * Allows for defining a custom component to be displayed for the loading state.
   * default: null (<Spinner />)
   */
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /**
   * Custom props to pass to the <Spinner /> component.
   * default: {},
   */
  spinnerProps: PropTypes.object,
  /**
   * Theme
   */
  theme: PropTypes.object.isRequired,
};

export default DefaultLoading;
