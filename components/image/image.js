import React, { Fragment } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Lazyload from 'react-lazyload';
import IrvingPicture from './irvingPicture';
import IrvingImg from './irvingImg';
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
        <IrvingPicture {...props} /> :
        <IrvingImg {...props} />
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
  /**
   * Alt text for the image
   */
  alt: PropTypes.string.isRequired,
  /**
   * Image aspect ratio. Used to apply intrinsic sizing CSS and
   * generate an appropriately sized placeholder for lazyloading.
   */
  aspectRatio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]).isRequired,
  /**
   * Additional classname(s) to add to image wrapper element
   */
  className: PropTypes.string,
  /**
   * Height of image. Necessary for lazyloading placeholder.
   */
  height: PropTypes.number.isRequired,
  /**
   * Wether or not to lazyload this image via react-lazyload
   */
  lazyload: PropTypes.bool.isRequired,
  /**
   * Src attribute for Low Quality Image Placeholder (LQIP)
   */
  lqipSrc: PropTypes.string.isRequired,
  /**
   * Should this component render a `<picture>` element?
   */
  picture: PropTypes.bool.isRequired,
  /**
   * String with contents of <img> `sizes` attribute
   */
  sizes: PropTypes.string.isRequired,
  /**
   * String with contents of <img> `src` attribute
   */
  src: PropTypes.string.isRequired,
  /**
   * String with contents of <img> `srcset` attribute
   */
  srcset: PropTypes.string.isRequired,
  /**
   * Array of objects containing values necessary for `<source>` tag attributes
   */
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * String with contents of <source> `srcset` attribute
       */
      srcset: PropTypes.string.isRequired,
      /**
       * Media query for which this `<source>` tag's srcset should apply
       */
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

