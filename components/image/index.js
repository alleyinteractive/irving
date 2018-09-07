import React, { Fragment } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Lazyload from 'react-lazyload';
import PictureElement from './picture';
import ImgElement from './img';
import styles from './image.css';

const Image = (props) => {
  const {
    alt,
    aspectRatio,
    className,
    height,
    lazyload,
    lqipSrc,
    picture,
  } = props;
  const paddingPercentage = aspectRatio ?
    { paddingBottom: `${aspectRatio * 100}%` } :
    null;
  // Set up image element(s) for maybe using with lazyload component
  const imageContent = (
    <span
      className={classNames(
        styles.wrapper,
        className,
        {
          [styles.apsectRatio]: aspectRatio,
        }
      )}
      style={paddingPercentage}
    >
      {picture ?
        <PictureElement {...props} /> :
        <ImgElement {...props} />
      }
    </span>
  );
  // Set up placeholder image with low quality image placeholder source
  const placeholder = lqipSrc ?
    (<img
      className={styles.placeholder}
      src={lqipSrc}
      alt={alt}
    />) :
    null;

  return (
    <Fragment>
      {lazyload ?
        <Lazyload
          height={placeholder ? height : null}
          placeholder={placeholder}
          once
          throttle
        >
          {imageContent}
        </Lazyload> :
        imageContent
      }
    </Fragment>
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]).isRequired,
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  lazyload: PropTypes.bool.isRequired,
  lqipSrc: PropTypes.string.isRequired,
  picture: PropTypes.bool.isRequired,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string.isRequired,
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ),
};

Image.defaultProps = {
  sourceTags: [],
  className: '',
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Image);

