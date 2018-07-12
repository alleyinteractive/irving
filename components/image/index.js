import React from 'react';
import PropTypes from 'prop-types';
import Picture from './picture';
import Img from './img';
import styles from './image.css';

const Image = (props) => {
  const {
    usePicture,
    sourceTags,
    srcset,
    src,
    alt,
  } = props;

  return (
    <div className={styles.wrapper}>
      {usePicture ?
        <Picture
          sourceTags={sourceTags}
          srcset={srcset}
          src={src}
          alt={alt}
        /> :
        <Img
          srcset={srcset}
          src={src}
          alt={alt}
        />
      }
    </div>
  );
};

Image.propTypes = {
  usePicture: PropTypes.bool.isRequired,
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ),
  srcset: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

Image.defaultProps = {
  sourceTags: [],
};

export default Image;

