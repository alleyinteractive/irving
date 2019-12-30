import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import styles from './columnLeftWrapper.css';

// eslint-disable-next-line no-unused-vars
const ColumnLeftWrapper = ({ children, themeName }) => (
  <div className={styles.leftCol}>
    {children}
  </div>
);

ColumnLeftWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  themeName: PropTypes.string.isRequired,
};

export default withThemes('content-area', {
  default: styles,
})(withStyles(styles)(ColumnLeftWrapper));
