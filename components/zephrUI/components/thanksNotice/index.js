import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './thanksNotice.css';

const ThanksNotice = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      ThanksNotice
      {children}
    </div>
  );
};

ThanksNotice.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ThanksNotice);

