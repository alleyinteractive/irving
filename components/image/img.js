import React from 'react';
import PropTypes from 'prop-types';

const ImgElement = (props) => {
  const {
    srcset,
    src,
    alt,
  } = props;

  return (
    <img alt={alt} src={src} srcSet={srcset} />
  );
};

ImgElement.propTypes = {
  srcset: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImgElement;
