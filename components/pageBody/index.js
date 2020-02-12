import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './pageBody.css';

const PageBody = ({ children, title, hideTitle }) => (
  <div className={styles.wrapper}>
    {! hideTitle && <h1 className={styles.title}>{title}</h1>}
    {children}
  </div>
);

PageBody.defaultProps = {
  hideTitle: false,
};

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  hideTitle: PropTypes.bool,
};

export default withStyles(styles)(PageBody);
