import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useIntersect from '@irvingjs/core/hooks/useIntersect';
import { Image } from './styles';

const IrvingImg = (props) => {
  const {
    alt,
    aspectRatio,
    sizes,
    src,
    srcset,
    onError,
    lazyload,
    lqipSrc,
  } = props;
  const [currentSrc, setCurrentSrc] = useState(lqipSrc);
  const [currentSrcSet, setCurrentSrcSet] = useState(null);
  const [setNode, entry] = useIntersect();
  const hasSrc = (currentSrc && currentSrc !== lqipSrc);
  // Set src and srcset if entry matches current node and src isn't already set.
  useEffect(() => {
    if (
      entry.target &&
      0 < entry.intersectionRatio &&
      ! hasSrc
    ) {
      setCurrentSrc(src);
      setCurrentSrcSet(srcset);
    }
  }, [entry]);

  return (
    <Image
      alt={alt}
      aspectRatio={aspectRatio}
      sizes={sizes}
      src={currentSrc}
      srcSet={currentSrcSet}
      onError={onError}
      lazyload={lazyload}
      ref={setNode}
      hasSrc={hasSrc}
    />
  );
};

IrvingImg.propTypes = {
  aspectRatio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]).isRequired,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onError: PropTypes.func.isRequired,
  lazyload: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  lqipSrc: PropTypes.string.isRequired,
};

IrvingImg.defaultProps = {
  sizes: '',
};

export default IrvingImg;
