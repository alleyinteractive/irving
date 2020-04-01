import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import {
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';
import history from 'utils/history';
import Link from 'components/helpers/link';
import RegisterForm from './form.js';

// Styles
import styles from './register.css';

const Register = ({
  isAuthenticated,
}) => {
  // Prevent authenticated users from being able to visit this route.
  if (isAuthenticated) {
    history.push('/');
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{__('Account', 'mittr')}</h1>
      <p className={styles.subheader}>
        {__('Create an account to improve your experience on this site.',
          'mittr')}
      </p>
      <p className={styles.headerDescription}>
        {__('Already have an account? ', 'mittr')}
        <Link to="/login/" className={styles.formLink}>
          {__('Sign in.', 'mittr')}
        </Link>
      </p>
      <RegisterForm />
    </div>
  );
};

Register.propTypes = {
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
  withStyles(styles)(Register)
);
