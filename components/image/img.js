import React from 'react';
import PropTypes from 'prop-types';

const Img = (props) => {
  const {
    srcset,
    src,
    alt,
  } = props;

  return (
    <img alt={alt} src={src} srcSet={srcset} />
  );
};

Img.propTypes = {
  srcset: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Img;
