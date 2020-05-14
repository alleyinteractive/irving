import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/helpers/spinner';
import classNames from 'classnames';
import styles from './defaultLoading.css';

const DefaultLoading = (props) => {
  const {
    className,
    fullScreen,
    fullScreenBgColor,
    children,
    spinnerProps,
  } = props;

  return (
    <div
      className={classNames(
        styles.wrapper,
        className,
        {
          [styles.fullScreen]: fullScreen,
        }
      )}
      style={{ backgroundColor: fullScreenBgColor }}
    >
      {children || <Spinner {...spinnerProps} />}
    </div>
  );
};

DefaultLoading.defaultProps = {
  className: '',
  fullScreen: false,
  fullScreenBgColor: '#FFF',
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
   * Whether or not the loader component should cover the entire screen.
   * default: false
   */
  fullScreen: PropTypes.bool,
  /**
   * Background color for full screen loader
   * default: `#FFF`
   */
  fullScreenBgColor: PropTypes.string,
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
};

export default DefaultLoading;
