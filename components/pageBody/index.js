import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './pageBody.css';

const PageBody = ({
  children,
  title,
  hideTitle,
  pageHeading,
}) => (
  <div className={styles.wrapper}>
    {'' !== pageHeading && (
      <h1 className={styles.pageHeader}>{pageHeading}</h1>
    )}
    {(! hideTitle && pageHeading) && (
      <h2 className={styles.title}>{title}</h2>
    )}
    {(! hideTitle && ! pageHeading) && (
      <h1 className={styles.title}>{title}</h1>
    )}
    {children}
  </div>
);

PageBody.defaultProps = {
  hideTitle: false,
  pageHeading: '',
};

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  hideTitle: PropTypes.bool,
  pageHeading: PropTypes.string,
};

export default withStyles(styles)(PageBody);
