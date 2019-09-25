import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './pageBody.css';

const PageBody = (props) => {
  const { children } = props;

  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PageBody);
