import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './dismissNotice.css';

const DismissNotice = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      DismissNotice
      {children}
    </div>
  );
};

DismissNotice.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(DismissNotice);

