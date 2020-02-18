import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getIsLoading,
  getForms,
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
  actionClearFormErrors,
} from 'actions/zephrActions';
import history from 'utils/history';

// Styles
import styles from './login.css';

const Login = ({
  isLoading,
  forms,
  submitLogin,
  clearErrors,
  isAuthenticated,
}) => {
  // Prevent authenticated users from being able to visit this route.
  if (isAuthenticated) {
    history.push('/');
  }

  const loginForm = forms.filter((form) => '/login' === form.route)[0];
  // Create submit handler.
  const onSubmit = (event) => {
    event.preventDefault();

    if (true === loginForm.error) {
      clearErrors({ route: '/login' });
    }

    const email = document.getElementById('email-address');
    const password = document.getElementById('current-password');

    // Drop focus on the inputs.
    const focused = document.activeElement;
    focused.blur();

    submitLogin({
      route: '/login',
      credentials: {
        email: email.value,
        password: password.value,
      },
    });
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Please enter your email address and password.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__(
          `If you have an account, we’ll get you signed in.
          If not, we’ll help you set one up. Easy, right?`,
          'mittr'
        )}
      </p>
      <form
        onSubmit={onSubmit}
        className={styles.formWrap}
      >
        {! isLoading && loginForm ? (
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
  isLoading: PropTypes.bool.isRequired,
  forms: PropTypes.array.isRequired,
  submitLogin: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (loginData) => dispatch(actionSubmitForm(loginData)),
  clearErrors: (routeInfo) => dispatch(actionClearFormErrors(routeInfo)),
});
const withRedux = connect(
  (state) => ({
    isLoading: getIsLoading(state),
    forms: getForms(state),
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(Login));
