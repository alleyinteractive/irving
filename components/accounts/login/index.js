import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './login.css';

// eslint-disable-next-line no-unused-vars
const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <h2 className={styles.accountSubHeader}>
        {__('Please enter your email address.', 'mittr')}
      </h2>
      <p className={styles.accountHeaderDescription}>
        {__(`If you have an account, we’ll get you signed in.
          If not, we’ll help you set one up. Easy, right?`, 'mittr')}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="userEmailInput"
            name="userEmailInput"
            placeholder={__('Enter your email address', 'mittr')}
          />
          <input type="submit" value="Continue" />
        </div>
        <p className={styles.ssoText}>
          {__('Or use your social media account:', 'mittr')}&nbsp;
          <a href="https://google.com">Google</a> /&nbsp;
          <a href="https://twitter.com">Twitter</a> /&nbsp;
          <a href="https://facebook.com">Facebook</a>
        </p>
      </form>
      <div className={styles.alumWrap}>
        <p>
          <strong>MIT alum?</strong> Sign in using your MIT Infinite
          Connection account.
        </p>
        <button type="button" className={styles.btnGray}>
          {__('Connect now', 'mittr')}
        </button>
        <a href="/learn-more-alumni">Learn More</a>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
