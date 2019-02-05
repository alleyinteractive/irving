import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './image.css';

const IrvingImg = (props) => {
  const {
    alt,
    sizes,
    src,
    srcset,
    onLoad,
    onError,
  } = props;

  return (
    <img
      alt={alt}
      className={styles.img}
      src={src}
      srcSet={srcset}
      sizes={sizes}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

IrvingImg.propTypes = {
  srcset: PropTypes.string.isRequired,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

IrvingImg.defaultProps = {
  sizes: '',
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(IrvingImg);
