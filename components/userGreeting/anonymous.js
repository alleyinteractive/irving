import React from 'react';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './userGreeting.css';

const Anonymous = () => (
  <div>
    <Link to="/login" className={styles.button}>
      {__('Sign in', 'mittr')}
    </Link>
    <Link to="/subscribe" className={styles.subscribe}>
      {__('Subscribe', 'mittr')}
    </Link>
  </div>
);

export default Anonymous;
