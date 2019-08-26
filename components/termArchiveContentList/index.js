import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './termArchiveContentList.css';

const TermArchiveContentList = (props) => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};

TermArchiveContentList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(TermArchiveContentList);
