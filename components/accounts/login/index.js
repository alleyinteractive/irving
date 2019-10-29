import React, { useState } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { actionRequestSendEmail } from 'actions/userActions';
import PropTypes from 'prop-types';

// Styles
import styles from './login.css';

const Login = ({ submitSignin }) => {
  // Set state variable userEmailInput which we use for the form input value.
  const [userEmailInput, setUserEmailInput] = useState('');
  const [emailValid, checkEmailValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    // This is not the action we really want to take on submit sign on, it is
    // only here to demo the functionality of the email service.
    if (emailValid) {
      submitSignin(userEmailInput);
    }
  };

  const validateEmail = (email) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    checkEmailValid(isEmailValid);
  };

  const handleInputChange = (event) => {
    const name = event.target.value;
    setUserEmailInput(name);
    validateEmail(name);
  };

  const handleConnectAlum = () => {
    // @todo stub.
    alert('Connect Alum'); // eslint-disable-line no-alert
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Please enter your email address.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__(
          `If you have an account, we’ll get you signed in.
          If not, we’ll help you set one up. Easy, right?`,
          'mittr'
        )}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="userEmailInput">
            <input
              type="text"
              id="userEmailInput"
              name="userEmailInput"
              value={userEmailInput}
              onChange={handleInputChange}
              className={classNames(styles.formInput, {
                [styles.inputInvalid]: ! emailValid,
              })}
              placeholder={__('Enter your email address', 'mittr')}
              aria-errormessage="email-error"
            />
          </label>
          <input
            type="submit"
            className={styles.continueBtn}
            value="Continue"
          />
        </div>
        {! emailValid && (
          <span
            className={styles.formError}
            aria-live="assertive"
            id="email-error"
          >
            {__(
              `Oops! Let’s try that again —
            please enter your email address.`,
              'mittr'
            )}
          </span>
        )}
        <h2 className={styles.ssoText} id="socialMediaSignOn">
          {__('Sign on with the following social media accounts:', 'mittr')}
        </h2>
        <ul className={styles.ssoList} aria-labelledby="socialMediaSignOn">
          <li>
            <a href="https://google.com">Google</a>/
          </li>
          <li>
            <a href="https://twitter.com">Twitter</a>/
          </li>
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
        </ul>
      </form>
      <div className={styles.alumWrap}>
        <h3 className={styles.alumTitle}>
          <span className={styles.leadIn}>{__('MIT alum?', 'mittr')}</span>{' '}
          {__('Sign in using your MIT Infinite Connection account.', 'mittr')}
        </h3>
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

Login.propTypes = {
  submitSignin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitSignin: (email) => dispatch(actionRequestSendEmail(email)),
});
const withRedux = connect(
  undefined,
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(Login));
