import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// Styles
import styles from './hubList.css';

const HubList = ({
  children,
}) => (
  <ul className={styles.wrapper}>
    {children}
  </ul>
);

HubList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(HubList);
