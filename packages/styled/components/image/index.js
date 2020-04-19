import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IrvingPicture from './irvingPicture';
import IrvingImg from './irvingImg';
import {
  Caption,
  Wrapper,
  WrapperElementFigure,
} from './styles';

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
    src,
    srcset,
    sizes,
    sourceTags,
  } = props;
  const [error, setError] = useState(false);
  const onError = () => setError(true);

  /* eslint-disable react/prop-types */
  const WrapperElement = caption ?
    ({ children }) => (
      <WrapperElementFigure showCaption={showCaption}>
        {children}
      </WrapperElementFigure>
    ) :
    ({ children }) => <>{children}</>;
  /* eslint-enable */

  // Set up image element(s) for maybe using with lazyload component
  const image = (
    <IrvingImg
      aspectRatio={aspectRatio}
      alt={alt}
      sizes={sizes}
      error={error}
      lazyload={lazyload}
      lqipSrc={lqipSrc}
      onError={onError}
      src={src}
      srcset={srcset}
    />
  );
  const imageContent = (
    <>
      {picture ? (
        <IrvingPicture
          aspectRatio={aspectRatio}
          sourceTags={sourceTags}
          lazyload={lazyload}
        >
          {image}
        </IrvingPicture>
      ) : (<>{image}</>)}
    </>
  );

  return (
    <WrapperElement>
      <Wrapper
        lazyload={lazyload}
        aspectRatio={aspectRatio}
        className={className}
        error={error}
      >
        {imageContent}
      </Wrapper>
      {(caption && showCaption) && <Caption>{caption}</Caption>}
    </WrapperElement>
  );
};

Image.propTypes = {
  /**
   * Alt text for the image.
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
   * Additional classname(s) to add to image wrapper element.
   */
  className: PropTypes.string,
  /**
   * Whether or not to lazyload this image via react-lazyload
   */
  lazyload: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  /**
   * Should this component render a `<picture>` element?
   */
  picture: PropTypes.bool,
  /**
   * Should the image caption be displayed?
   */
  showCaption: PropTypes.bool,
  /**
   * String with contents of <img> `sizes` attribute.
   */
  sizes: PropTypes.string,
  /**
   * String with contents of <img> `src` attribute.
   */
  src: PropTypes.string.isRequired,
  /**
   * String with contents of <img> `srcset` attribute.
   */
  srcset: PropTypes.string.isRequired,
  /**
   * Array of objects containing values necessary for `<source>` tag attributes.
   */
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * String with contents of <source> `srcset` attribute.
       */
      srcset: PropTypes.string.isRequired,
      /**
       * Media query for which this `<source>` tag's srcset should apply.
       */
      media: PropTypes.string.isRequired,
    })
  ),
};

Image.defaultProps = {
  caption: '',
  className: '',
  sourceTags: [],
  picture: false,
  sizes: '',
  showCaption: false,
};

export default Image;
