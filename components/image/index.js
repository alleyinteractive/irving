import React from 'react';
import PropTypes from 'prop-types';
import PictureElement from './picture';
import ImgElement from './img';
import styles from './image.css';

const Image = (props) => {
  const {
    picture,
    sourceTags,
    srcset,
    src,
    alt,
  } = props;

  return (
    <div className={styles.wrapper}>
      {picture ?
        <PictureElement
          sourceTags={sourceTags}
          srcset={srcset}
          src={src}
          alt={alt}
        /> :
        <ImgElement
          srcset={srcset}
          src={src}
          alt={alt}
        />
      }
    </div>
  );
};

Image.propTypes = {
  picture: PropTypes.bool.isRequired,
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

