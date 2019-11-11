import React, { useState } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Recaptcha from 'react-recaptcha';

// Styles
import styles from './register.css';

const Register = () => {
  // @todo The logic in this component is very basic and needs to be fleshed out,
  // but that work was not within the scope of MIT-350.
  const [userFullNameInput, setUserFullNameInput] = useState('');
  const [userPasswordInput, setUserPasswordInput] = useState('');
  const [confirmUserPasswordInput, setConfirmUserPasswordInput] = useState('');
  const [termsCheckbox, setTermsCheckbox] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      '' !== userFullNameInput &&
      '' !== userPasswordInput &&
      '' !== confirmUserPasswordInput
    ) {
      console.log('Create an account.');
    } else {
      // Define error handling logic.
      console.log('Something went wrong.');
    }
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Thanks! Just one more step.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Complete your account information below.', 'mittr')}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="userFullNameInput">
            <input
              type="text"
              id="userFullNameInput"
              name="userFullNameInput"
              value={userFullNameInput}
              onChange={(event) => {
                const { value } = event.target;
                setUserFullNameInput(value);
              }}
              className={styles.formInput}
              placeholder={__('Enter your full name', 'mittr')}
              aria-errormessage="fullname-error"
            />
          </label>
          <label htmlFor="userPasswordInput">
            <input
              type="password"
              id="userPasswordInput"
              name="userPasswordInput"
              value={userPasswordInput}
              onChange={(event) => {
                const { value } = event.target;
                setUserPasswordInput(value);
              }}
              className={styles.formInput}
              placeholder={__('Create a password for your account', 'mittr')}
              aria-errormessage="password-error"
            />
          </label>
          <label htmlFor="confirmUserPasswordInput">
            <input
              type="password"
              id="confirmUserPasswordInput"
              name="confirmUserPasswordInput"
              value={confirmUserPasswordInput}
              onChange={(event) => {
                const { value } = event.target;
                setConfirmUserPasswordInput(value);
              }}
              className={styles.formInput}
              placeholder={__('Confirm your password', 'mittr')}
              aria-errormessage="confirm-password-error"
            />
          </label>
          {/* @todo stub. */}
          <label htmlFor="termsCheckbox">
            <input
              type="checkbox"
              id="termsCheckbox"
              name="termsCheckbox"
              value={termsCheckbox}
              onChange={(event) => {
                const { value } = event.target;
                setTermsCheckbox(value);
              }}
              className={styles.formCheckbox}
            />
            <p className={styles.termsText}>
              {__(
                'I agree to the terms of service and have reviewed the privacy policy.', // eslint-disable-line max-len
                'mittr'
              )}
            </p>
          </label>
          <Recaptcha sitekey="superdupersecret" />
          <input
            type="submit"
            className={styles.createBtn}
            value="Create this account"
          />
        </div>
        <h2 className={styles.confirmationText}>
          {__(
            "We'll email you a password confirmation link. Happy reading!", // eslint-disable-line quotes
            'mittr'
          )}
        </h2>
      </form>
    </div>
  );
};

export default withStyles(styles)(Register);
