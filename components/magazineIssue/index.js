import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';

// Styles
import styles from './magazineIssue.css';

const MagazineIssue = ({ children, permalink, title }) => (
  <Link to={permalink} className={styles.wrapper}>
    <span className="screen-reader-text">{title}</span>
    <div className={styles.cover}>{children}</div>
  </Link>
);

MagazineIssue.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineIssue);
