import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './errorMessage.css';

const ErrorMessage = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.heading}>Something has gone wrong.</h1>
    <p>You can try refreshing the page. The problem may be temporary.</p>
    <p>We have been notified of the problem, and are working to resolve it.</p>
  </div>
);

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ErrorMessage);
