import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/helpers/spinner';
import classNames from 'classnames';
import styles from './defaultLoading.css';

const DefaultLoading = (props) => {
  const {
    fullScreen,
    loadingComponent,
    spinnerProps,
  } = props;

  return (
    <div className={classNames(
      styles.wrapper,
      {
        [styles.fullScreen]: fullScreen,
      }
    )}
    >
      {loadingComponent || <Spinner {...spinnerProps} />}
    </div>
  );
};

DefaultLoading.defaultProps = {
  fullScreen: false,
  loadingComponent: null,
  spinnerProps: {},
};

DefaultLoading.propTypes = {
  fullScreen: PropTypes.bool,
  loadingComponent: PropTypes.element,
  spinnerProps: PropTypes.object,
};

export default DefaultLoading;
