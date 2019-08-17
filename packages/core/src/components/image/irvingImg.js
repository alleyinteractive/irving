import React, { useRef, useEffect } from 'react';
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
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  }, [imgRef.current]);

  return (
    <img
      alt={alt}
      className={styles.img}
      ref={imgRef}
      src={src}
      srcSet={srcset || null}
      sizes={sizes || null}
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
