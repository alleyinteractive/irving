/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import setContrast from 'utils/setContrast';
import hexToRgb from 'utils/hexToRgb';

// Styles
import styles from './listDescription.css';

const ListDescription = ({ children, color, textColor }) => {
  // If textColor is not being set from post_meta in the api, then set the
  // appropriate text color based on the color.
  const headerTextColor = '' === textColor ?
    setContrast(hexToRgb(color)) : textColor;

  return (
    <div
      className={styles.wrapper}
      style={{
        '--highlight-color': color,
        '--letter-background-color': headerTextColor,
        color: headerTextColor,
      }}
    >
      {children}
    </div>
  );
};

ListDescription.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

ListDescription.defaultProps = {
  color: '#333333',
  textColor: '',
};

export default withStyles(styles)(ListDescription);
