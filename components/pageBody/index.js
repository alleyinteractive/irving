import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './pageBody.css';

const PageBody = ({ children, title }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>{title}</h1>
    {children}
  </div>
);

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(PageBody);
