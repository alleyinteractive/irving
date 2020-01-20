/* eslint-disable */
import React, { useState } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getIsLoading,
  getForms
} from 'selectors/zephrSelector';
import { actionSubmitForm } from 'actions/zephrActions';

// Styles
import styles from './login.css';

const Login = ({ isLoading, forms, submitLogin }) => {
  const loginForm = forms.filter((form) => '/login' === form.route)[0];
  // Create submit handler.
  const onSubmit = (event) => {
    event.preventDefault();

    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;

    submitLogin({ route: loginForm.route, credentials: { email, password } });
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
      <form onSubmit={onSubmit} className={styles.formWrap}>
        {!isLoading && loginForm ? (
          loginForm.components
        ) : null}

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
          onClick={() => {}}
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
  submitLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (loginData) => dispatch(actionSubmitForm(loginData)),
});
const withRedux = connect(
  (state) => ({
    isLoading: getIsLoading(state),
    forms: getForms(state),
  }),
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(Login));
