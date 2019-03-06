import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import Container from 'components/helpers/container';

import styles from './placeholderLoading.css';

const PlaceholderLoading = () => (
  <Container className={styles.wrapper} aria-hidden="true">
    <div className={styles.thumb} />
    <div className={styles.content}>
      <div className={styles.textBar} />
      <div className={styles.textBar} />
      <div className={styles.textBar} />
      <div className={styles.textBar} />
    </div>
  </Container>
);

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(PlaceholderLoading);
