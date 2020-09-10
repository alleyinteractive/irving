import React from 'react';
import PropTypes from 'prop-types';

const LoadingIndicator = (props) => {
  const {
    color,
    size,
    theme,
  } = props;
  const { IndicatorIcon } = theme;

  // Using inline styles for centering prevents jumpiness as the component is
  // loaded, and allows passing color and size props to  inline styles.
  // `stroke="currentColor"` on the SVG `<g>` or `<path>` element allows the
  // `color` CSS property from the parent `<svg>` to cascade.
  const inlineStyle = {
    color,
    display: 'block',
    height: size,
    margin: '0 auto',
    width: size,
  };

  return (
    <IndicatorIcon style={inlineStyle} />
  );
};

LoadingIndicator.defaultProps = {
  color: '#777',
  size: '75px',
};

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

export default LoadingIndicator;
