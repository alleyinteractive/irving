import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from 'critical-style-loader/lib';
import setContrast from 'utils/setContrast';
import hexToRgb from 'utils/hexToRgb';

const List50Content = (props) => {
  const {
    children,
    color,
    textColor,
  } = props;

  // If textColor is not being set from post_meta in the api, then set the
  // appropriate text color based on the color.
  const contentTextColor = '' === textColor ?
    setContrast(hexToRgb(color)) : textColor;

  return (
    <div
      style={{
        backgroundColor: color,
        '--list-50-text-color': contentTextColor,
      }}
    >
      {children}
    </div>
  );
};

List50Content.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

List50Content.defaultProps = {
  color: '#333333',
  textColor: '',
};

export default List50Content;
