import React, { useState } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { actionSubmitUserPassword } from 'actions/userActions';
import { getUserFirstName } from 'selectors/getUser';
import PropTypes from 'prop-types';

// Styles
import styles from './login.css';

const PasswordInputScreen = ({ submitPassword, userName = '' }) => {
  const [userPasswordInput, setUserPasswordInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if ('' !== userPasswordInput) {
      submitPassword(userPasswordInput);
    } else {
      // Define error handling logic.
      console.log('Something went wrong with the password.'); // eslint-disable-line no-console
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUserPasswordInput(value);
  };

  const handleConnectAlum = () => {
    // @todo stub.
    alert('Connect Alum'); // eslint-disable-line no-alert
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__(`Welcome back, ${userName}!`, 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Please enter your password to continue.', 'mittr')}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="userPasswordInput">
            <input
              type="password"
              id="userPasswordInput"
              name="userPasswordInput"
              value={userPasswordInput}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder={__('Enter your password', 'mittr')}
              aria-errormessage="password-error"
            />
          </label>
          <input
            type="submit"
            className={styles.continueBtn}
            value="Continue"
          />
        </div>
        {/* @todo break out SSO/Infinite Connection into reusable components */}
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

PasswordInputScreen.propTypes = {
  submitPassword: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitPassword: (password) => dispatch(actionSubmitUserPassword(password)),
});
const withRedux = connect(
  (state) => ({
    userName: getUserFirstName(state),
  }),
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(PasswordInputScreen));
