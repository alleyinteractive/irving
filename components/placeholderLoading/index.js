import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import styles from './placeholderLoading.css';
import ColumnArea from '../columnArea';

const PlaceholderLoading = () => (
  <ColumnArea
    className={styles.wrapper}
    aria-hidden="true"
    themeName="fullStory"
  >
    <div className={styles.thumb} />
    <div className={styles.content}>
      <div className={styles.textBar} />
      <div className={styles.textBar} />
      <div className={styles.textBar} />
      <div className={styles.textBar} />
    </div>
  </ColumnArea>
);

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(PlaceholderLoading);
