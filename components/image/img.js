import React from 'react';
import PropTypes from 'prop-types';

const ImgElement = (props) => {
  const {
    alt,
    sizes,
    src,
    srcset,
  } = props;

  return (
    <img
      alt={alt}
      src={src}
      srcSet={srcset}
      sizes={sizes}
    />
  );
};

ImgElement.propTypes = {
  srcset: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImgElement;
