/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import setContrast from 'utils/setContrast';
import hexToRgb from 'utils/hexToRgb';

// Styles
import styles from './listDescription.css';

const ListDescription = ({ children, color }) => (
  <div
    className={styles.wrapper}
    style={{
      '--highlight-color': color,
      '--letter-background-color': setContrast(hexToRgb(color)),
      color: setContrast(hexToRgb(color)),
    }}
  >
    {children}
  </div>
);

ListDescription.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string,
};

ListDescription.defaultProps = {
  color: '#333333',
};

export default withStyles(styles)(ListDescription);
