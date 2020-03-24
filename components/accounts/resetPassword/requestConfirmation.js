import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './reset.css';

const ConfirmResetRequest = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.header}>{__('Sign in', 'mittr')}</h1>
    <p className={styles.subheader}>
      {__('Thanks! We’ve received your request to reset your password. ',
        'mittr')}
    </p>
    <p className={styles.headerDescription}>
      {__(
        `If an account exists with the email address you provided,
        we’ll send you an email in a minute or two to confirm the change.`,
        'mittr'
      )}
    </p>
    <Link to="/" className={styles.homeButton}>Go Home</Link>
  </div>
);

export default withStyles(styles)(ConfirmResetRequest);
