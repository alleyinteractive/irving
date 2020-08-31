import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { richText } from '@irvingjs/core/config/html';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
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
    height,
    loading,
    objectFit,
    showMeta,
    sizes,
    src,
    srcset,
    style,
    theme,
    width,
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

  // Ensure we constrain the sizes attribute if none
  // is passed whenever a srcset attribute is present.
  const getSizes = () => {
    if (srcset && ! sizes && width) {
      return `(max-width: ${width}px) 100vw, ${width}px`;
    }

    return sizes;
  };

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
          height={height}
          loading={loading}
          objectFit={objectFit}
          src={src || fallbackSrc}
          srcSet={srcset}
          sizes={getSizes()}
          width={width}
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
  height: false,
  loading: 'lazy',
  objectFit: 'cover',
  showMeta: true,
  sizes: '',
  src: '',
  srcset: '',
  style: {},
  theme: defaultStyles,
  width: false,
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
   * Height attribute of the image.
   */
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  /**
   * Loading attribute.
   */
  loading: PropTypes.string,
  /**
   * Object fit property.
   */
  objectFit: PropTypes.string,
  /**
   * Display meta.
   */
  showMeta: PropTypes.bool,
  /**
   * Sizes attribute
   */
  sizes: PropTypes.string,
  /**
   * Source URL of the image.
   */
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * Source set list of the image.
   */
  srcset: PropTypes.string,
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
  /**
   * Width attribute of the image.
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
};

export const themeMap = {
  default: defaultStyles,
};

export { Image as PureComponent };

export const StyledComponent = withThemes(themeMap)(Image);

export default StyledComponent;
