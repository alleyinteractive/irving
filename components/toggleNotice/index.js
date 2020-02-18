import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './toggleNotice.css';

const ToggleNotice = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ToggleNotice
      {children}
    </div>
  );
};

ToggleNotice.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ToggleNotice);

