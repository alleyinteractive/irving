import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './contentBody.css';

const ContentBody = (props) => {
  const { children } = props;

  return <div className={styles.wrapper}>{children}</div>;
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ContentBody);
