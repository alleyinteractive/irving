import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './placeholderLoading.css';

const PlaceholderLoading = () => (
  <div className={styles.wrapper} aria-hidden="true">
    <div className={styles.thumb} />
    <div className={styles.content}>
      <div className={styles.textBar} />
      <div className={styles.textBar} />
      <div className={styles.textBar} />
      <div className={styles.textBar} />
    </div>
  </div>
);

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(PlaceholderLoading);
