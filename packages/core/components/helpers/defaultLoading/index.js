import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/helpers/spinner';
import classNames from 'classnames';
import styles from './defaultLoading.css';

const DefaultLoading = (props) => {
  const {
    fullScreen,
    fullScreenBgColor,
    loadingComponent,
    spinnerProps,
  } = props;

  return (
    <div
      className={classNames(
        styles.wrapper,
        {
          [styles.fullScreen]: fullScreen,
        }
      )}
      style={{ backgroundColor: fullScreenBgColor }}
    >
      {loadingComponent || <Spinner {...spinnerProps} />}
    </div>
  );
};

DefaultLoading.defaultProps = {
  fullScreen: false,
  fullScreenBgColor: '#FFF',
  loadingComponent: null,
  spinnerProps: {},
};

DefaultLoading.propTypes = {
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
  loadingComponent: PropTypes.element,
  /**
   * Custom props to pass to the <Spinner /> component.
   * default: {},
   */
  spinnerProps: PropTypes.object,
};

export default DefaultLoading;
