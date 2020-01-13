import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';

// Styles
import styles from './linkTeaser.css';

const LinkTeaser = ({
  permalink,
  publishedDate,
  teaseCTA,
  title,
}) => (
  <Link className={styles.wrapper} to={permalink}>
    <h4 className={styles.title}>{title}</h4>
    <div className={styles.teaseCTA}>{teaseCTA}</div>
    <div className={styles.date}>{publishedDate}</div>
  </Link>
);

LinkTeaser.propTypes = {
  permalink: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  teaseCTA: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

};

export default withStyles(styles)(LinkTeaser);
