import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './carousel.css';

const Carousel = (props) => {
  const { align, images } = props;
  const carousel = images.map((image) => {
    const imageProps = {
      original: image.original,
      originalAlt: image.alt,
      description: image.caption,
      credit: image.credit,
    };
    return imageProps;
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [isVisible]);

  return (
    <div className={classNames(
      'carouselWrapper',
      isVisible ? 'isVisible' : '',
      align,
    )}
    >
      <ImageGallery
        useBrowserFullscreen={false}
        showFullscreenButton={false}
        showBullets={false}
        showIndex
        indexSeparator="of"
        showThumbnails={false}
        showPlayButton={false}
        slideDuration={160}
        items={carousel}
        renderItem={(item) => (
          <Fragment>
            <div className="image-gallery-image">
              {
                item.imageSet ? (
                  <picture>
                    {
                      item.imageSet.map((source) => (
                        <source
                          key={source.media}
                          media={source.media}
                          srcSet={source.srcSet}
                          type={source.type}
                        />
                      ))
                    }
                    <img
                      alt={item.originalAlt}
                      src={item.original}
                    />
                  </picture>
                ) : (
                  <img
                    src={item.original}
                    alt={item.originalAlt}
                    srcSet={item.srcSet}
                    sizes={item.sizes}
                    title={item.originalTitle}
                  />
                )
              }
            </div>
            {
              item.credit && (
                <span className="image-credit">
                  {item.credit}
                </span>
              )
            }

            {
              item.description && (
                <span className="image-description ">
                  {item.description}
                </span>
              )
            }
          </Fragment>
        )}
      />
    </div>
  );
};

Carousel.defaultProps = {
  align: '',
};

Carousel.propTypes = {
  align: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default withStyles(styles)(Carousel);
