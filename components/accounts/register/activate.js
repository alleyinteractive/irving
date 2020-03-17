import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import {
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';
import { __ } from '@wordpress/i18n';
import RegisterForm from './form.js';

// Styles
import styles from './register.css';

const Activate = ({
  isAuthenticated,
}) => {
  if (isAuthenticated) {
    return (
      <div className={styles.wrapper}>
        You are authenticated and you need to logout and login again.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>
        {__('Activate your account',
          'mittr')}
      </h1>
      <p className={styles.headerDescription}>
        {__(
          'Enter your name and choose a password to claim your subscription.',
          'mittr'
        )}
      </p>
      <RegisterForm />
    </div>
  );
};

Activate.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const withRedux = connect(
  (state) => ({
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  () => ({})
);

export default withRedux(
  withStyles(styles)(Activate)
);
