import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
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
    sizes,
    src,
    srcset,
    sourceTags,
    theme,
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
    <>
      {picture ? (
        <IrvingPicture
          alt={alt}
          sourceTags={sourceTags}
          src={src}
          srcset={srcset}
          theme={theme}
          onLoad={onLoad}
          onError={onError}
        />
      ) : (
        <IrvingImg
          alt={alt}
          sizes={sizes}
          src={src}
          srcset={srcset}
          theme={theme}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </>
  );

  // Set up placeholder image with low quality image placeholder source
  const placeholder = lqipSrc ?
    (
      <img
        className={theme.placeholder}
        src={lqipSrc}
        alt={alt}
      />
    ) :
    null;

  return (
    <WrapperElement>
      <span
        className={classNames(
          theme.wrapper,
          className,
          {
            [theme.apsectRatio]: aspectRatio,
            [theme.lazyload]: lazyload,
            [theme.loaded]: loaded,
            [theme.error]: error,
          }
        )}
        style={paddingPercentage}
      >
        {
          lazyload ? (
            <>
              {placeholder}
              {imageContent}
            </>
          ) : imageContent
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
   * Image caption. This prop will modify the image markup to use a <figure>.
   */
  caption: PropTypes.string,
  /**
   * Additional classname(s) to add to image wrapper element
   */
  className: PropTypes.string,
  /**
   * Wether or not to lazyload this image via react-lazyload
   */
  lazyload: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
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
  /**
   * Theme object.
   */
  theme: PropTypes.object.isRequired,
};

Image.defaultProps = {
  caption: '',
  className: '',
  sourceTags: [],
  picture: false,
  sizes: '',
  showCaption: false,
};

const wrapWithThemes = withThemes('Image', { default: styles });

export const themeImage = createWithUserThemes(Image, styles);
export default wrapWithThemes(Image);
