import React, { Fragment, useState } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IrvingPicture from './irvingPicture';
import IrvingImg from './irvingImg';
import styles from './image.css';

const Image = (props) => {
  const {
    alt,
    aspectRatio,
    caption,
    className,
    lazyload,
    lqipSrc,
    picture,
    showCaption,
  } = props;
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const onLoad = () => setLoaded(true);
  const onError = () => setError(true);
  const paddingPercentage = aspectRatio ?
    { paddingBottom: `${aspectRatio * 100}%` } :
    null;
  const WrapperElement = caption ? 'figure' : Fragment;

  // Set up image element(s) for maybe using with lazyload component
  const imageContent = (
    <Fragment>
      {picture ? (
        <IrvingPicture
          {...props}
          onLoad={onLoad}
          onError={onError}
        />
      ) : (
        <IrvingImg
          {...props}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </Fragment>
  );

  // Set up placeholder image with low quality image placeholder source
  const placeholder = lqipSrc ?
    (
      <img
        className={styles.placeholder}
        src={lqipSrc}
        alt={alt}
      />
    ) :
    null;

  return (
    <WrapperElement>
      <span
        className={classNames(
          styles.wrapper,
          className,
          {
            [styles.apsectRatio]: aspectRatio,
            [styles.lazyload]: lazyload,
            [styles.loaded]: loaded,
            [styles.error]: error,
          }
        )}
        style={paddingPercentage}
      >
        {lazyload ?
          (
            <Fragment>
              {placeholder}
              {imageContent}
            </Fragment>
          ) :
          imageContent
        }
      </span>
      {(caption && showCaption) && <figcaption>{caption}</figcaption>}
    </WrapperElement>
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
   * Whether or not to include default styles for an image with a static aspect ratio
   */
  aspectRatioStyles: PropTypes.bool,
  /**
   * Image caption. This prop will modify the image markup to use a <figure>.
   */
  caption: PropTypes.string,
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
  picture: PropTypes.bool,
  /**
   * Should the image caption be displayed?
   */
  showCaption: PropTypes.bool,
  /**
   * String with contents of <img> `sizes` attribute
   */
  sizes: PropTypes.string,
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
  aspectRatioStyles: true,
  caption: '',
  className: '',
  sourceTags: [],
  picture: false,
  sizes: '',
  showCaption: false,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Image);
