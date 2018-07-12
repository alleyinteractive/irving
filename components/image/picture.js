import React from 'react';
import PropTypes from 'prop-types';
import Img from './img';

const Picture = (props) => {
  const {
    sourceTags,
    src,
    srcset,
    alt,
  } = props;

  return (
    <picture>
      {sourceTags.map((source) => {
        const { srcset: sourceSrcset, media } = source;
        return (<source key={media} srcSet={sourceSrcset} media={media} />);
      })}
      <Img srcset={srcset} src={src} alt={alt} />
    </picture>
  );
};

Picture.propTypes = {
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ).isRequired,
  srcset: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Picture;

