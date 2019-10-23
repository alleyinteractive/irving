import React, { useState } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './login.css';

const Login = () => {
  // Set state variable userEmailInput which we use for the form input value.
  const [userEmailInput, setUserEmailInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submit form value ${userEmailInput} to Nexus!`);
  };

  const handleInputChange = (event) => {
    const name = event.target.value;
    // Set State.
    setUserEmailInput(name);
  };

  const handleConnectAlum = () => {
    alert('Connect Alum');
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
            value={userEmailInput}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder={__('Enter your email address', 'mittr')}
          />
          <input
            type="submit"
            className={styles.continueBtn}
            value="Continue"
          />
        </div>
        <p className={styles.ssoText}>
          { /* TODO: Write code for SSO */ }
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
        <button
          type="button"
          className={styles.connectBtn}
          onClick={handleConnectAlum}
        >
          {__('Connect now', 'mittr')}
        </button>
        <a href="https://google.com" className={styles.btnLink}>
          {__('Learn more', 'mittr')}
        </a>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
