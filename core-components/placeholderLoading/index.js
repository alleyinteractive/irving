import React from 'react';
import { withStyles } from 'critical-style-loader/lib';

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
