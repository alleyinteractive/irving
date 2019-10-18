import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';

// Styles
import styles from './linkTeaser.css';

const LinkTeaser = ({ teaseCTA, permalink, title }) => (
  <Link className={styles.wrapper} to={permalink}>
    <h4 className={styles.title}>{title}</h4>
    <div className={styles.teaseCTA}>{teaseCTA}</div>
  </Link>
);

LinkTeaser.propTypes = {
  teaseCTA: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(LinkTeaser);
