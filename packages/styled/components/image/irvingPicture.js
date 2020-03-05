import React from 'react';
import PropTypes from 'prop-types';
import { Picture } from './styles';

const IrvingPicture = (props) => {
  const {
    aspectRatio,
    children,
    lazyload,
    sourceTags,
  } = props;

  return (
    <Picture
      lazyload={lazyload}
      aspectRatio={aspectRatio}
    >
      {sourceTags.map((source) => {
        const { srcset: sourceSrcset, media } = source;
        return (<source key={media} srcSet={sourceSrcset} media={media} />);
      })}
      {children}
    </Picture>
  );
};

IrvingPicture.propTypes = {
  aspectRatio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]).isRequired,
  children: PropTypes.element.isRequired,
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ).isRequired,
  lazyload: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
};

export default IrvingPicture;

