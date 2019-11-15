import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const IrvingImg = (props) => {
  const {
    alt,
    sizes,
    src,
    srcset,
    onLoad,
    onError,
    theme,
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
      className={theme.img}
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
  theme: PropTypes.string.isRequired,
};

IrvingImg.defaultProps = {
  sizes: '',
};

export default IrvingImg;
