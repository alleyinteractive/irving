import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import Link from 'components/helpers/link';
import {
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';
import {
  actionRequestUserLogOut,
} from 'actions/zephrActions';
import { __ } from '@wordpress/i18n';
import RegisterForm from './form.js';

// Styles
import styles from './register.css';

const Activate = ({
  isAuthenticated,
  logOut,
}) => {
  if (isAuthenticated) {
    logOut();
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>
        {__('Activate your account',
          'mittr')}
      </h1>
      <p className={styles.headerDescription}>
        {__(
          'Enter your name and choose a password to claim your subscription. ',
          'mittr'
        )}
        {__('Already have an account? ', 'mittr')}
        <Link to="/login/" className={styles.formLink}>
          {__('Sign in.', 'mittr')}
        </Link>
      </p>
      <RegisterForm />
    </div>
  );
};

Activate.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const withRedux = connect(
  (state) => ({
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  (dispatch) => ({
    logOut: () => dispatch(actionRequestUserLogOut()),
  })
);

export default withRedux(
  withStyles(styles)(Activate)
);
