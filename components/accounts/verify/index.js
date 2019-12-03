import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './verify.css';

const Verify = () => (
  <div className={styles.accountWrap}>
    <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
    <p className={styles.accountSubHeader}>
      {__('Thanks! Your email address is now verified.', 'mittr')}
    </p>
    <p className={styles.accountHeaderDescription}>
      {__(
        `If you are not automaticall redirected,
        click the button below to go to the homepage.`,
        'mittr'
      )}
    </p>
    <a href="/" className={styles.homeButton}>Go Home</a>
  </div>
);

export default withStyles(styles)(Verify);
