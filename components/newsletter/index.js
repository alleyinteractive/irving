import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './newsletter.css';

const Newsletter = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      Newsletter
      {children}
    </div>
  );
};

Newsletter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(Newsletter);

