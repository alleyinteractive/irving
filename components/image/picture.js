import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import IrvingImg from './img';
import styles from './image.css';

const IrvingPicture = (props) => {
  const {
    sourceTags,
    src,
    srcset,
    alt,
    onLoad,
    onError,
  } = props;

  return (
    <picture className={styles.picture}>
      {sourceTags.map((source) => {
        const { srcset: sourceSrcset, media } = source;
        return (<source key={media} srcSet={sourceSrcset} media={media} />);
      })}
      <IrvingImg
        srcset={srcset}
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  );
};

IrvingPicture.propTypes = {
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ).isRequired,
  srcset: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(IrvingPicture);

