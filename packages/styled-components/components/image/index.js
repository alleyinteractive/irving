import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { richText } from '@irvingjs/core/config/html';
import * as defaultStyles from './themes/default';

/**
 * Predetermined aspect ratio options.
 *
 * @type {Object}
 */
const aspectRatioMapping = {
  '1:1': 1,
  square: 1,
  '4:3': 0.75,
  '3:2': 0.6667,
  '16:9': 0.5625,
};

/**
 * Display an image.
 *
 * @todo LQIP functionality.
 * @todo Photon transforms.
 * @todo Picture element.
 * @todo Retina support.
 * @todo Source sets.
 */
const Image = (props) => {
  const {
    allowUpscaling,
    alt,
    caption,
    children,
    className,
    credit,
    fallbackSrc,
    loading,
    objectFit,
    // eslint-disable-next-line no-unused-vars
    photonTransformations,
    // eslint-disable-next-line no-unused-vars
    pictureSources,
    showMeta,
    src,
    style,
    theme,
  } = props;

  const {
    FigureWrapper,
    ImageTag,
    ImageCaption,
    ImageCredit,
    ImageMeta,
    ImageWrapper,
  } = theme;

  /**
   * @todo possibly replace this with similar functionality. This hook breaks b/c it references window.
   * const [width] = useImageSize(src || fallbackSrc);
   */

  // Allow using an aspect ratio mapping.
  let { aspectRatio } = props;
  if (
    'string' === typeof aspectRatio &&
    undefined !== aspectRatioMapping[aspectRatio]
  ) {
    aspectRatio = aspectRatioMapping[aspectRatio];
  }

  return (
    <FigureWrapper
      allowUpscaling={allowUpscaling}
      classsName={className}
      style={style}
    >
      <ImageWrapper aspectRatio={aspectRatio}>
        <ImageTag
          alt={alt}
          aspectRatio={aspectRatio}
          loading={loading}
          objectFit={objectFit}
          src={src || fallbackSrc}
        />
      </ImageWrapper>
      {(caption || credit) && showMeta && (
        <ImageMeta>
          {caption && (
            <ImageCaption
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(caption, richText) }} // eslint-disable-line react/no-danger, max-len
            />
          )}
          {credit && (
            <ImageCredit
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(credit, richText) }} // eslint-disable-line react/no-danger, max-len
            />
          )}
        </ImageMeta>
      )}
      {0 !== children.length && children}
    </FigureWrapper>
  );
};

Image.defaultProps = {
  allowUpscaling: false,
  alt: '',
  aspectRatio: false,
  caption: '',
  children: [],
  className: '',
  credit: '',
  fallbackSrc: '',
  loading: 'lazy',
  objectFit: 'cover',
  photonTransformations: [],
  pictureSources: [],
  showMeta: true,
  src: '',
  style: {},
  theme: defaultStyles,
};

Image.propTypes = {
  /**
   * Allow an image to be scaled to larger than its actual width.
   */
  allowUpscaling: PropTypes.bool,
  /**
   * Alt attribute.
   */
  alt: PropTypes.string,
  /**
   * Force an aspect ratio.
   */
  aspectRatio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
    PropTypes.oneOf(Object.keys(aspectRatioMapping)),
  ]),
  /**
   * Caption.
   */
  caption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * Children of the component.
   */
  children: PropTypes.node,
  /**
   * Class name for <ImageWrapper />.
   */
  className: PropTypes.string,
  /**
   * Caption.
   */
  credit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * Fallback src if the main `src` is empty.
   */
  fallbackSrc: PropTypes.string,
  /**
   * Loading attribute.
   */
  loading: PropTypes.string,
  /**
   * Object fit property.
   */
  objectFit: PropTypes.string,
  /**
   * Use the Photon API to modify the source.
   *
   * @see https://developer.wordpress.com/docs/photon/api/
   */
  photonTransformations: PropTypes.array,
  /**
   * Picture sources.
   */
  pictureSources: PropTypes.array,
  /**
   * Display meta.
   */
  showMeta: PropTypes.bool,
  /**
   * Source URL of the image.
   */
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * CSS styles.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Image as Component,
  themeMap,
};

export default Image;
