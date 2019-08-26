import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './termArchiveContentListItem.css';

const TermArchiveContentListItem = ({
  excerpt, permalink, title, children,
}) => {
  console.log(permalink, excerpt);
  return (
    <div className={styles.wrapper}>
      {title}
      <p>Lorem ipsum </p>
      {children}
    </div>
  );
};

TermArchiveContentListItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default withStyles(styles)(TermArchiveContentListItem);

