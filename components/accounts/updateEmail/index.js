import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import {
  actionReceiveUpdateEmail,
} from 'actions/zephrActions';

// Styles
import styles from './updateEmail.css';

const UpdateEmail = ({
  submitUpdateEmail,
}) => {
  // Create submit handler.
  const onSubmit = (event) => {
    console.log('UpdateEmail event ', event);
    event.preventDefault();

    const {
      location: {
        search,
      },
    } = window;
    // Extract the token from the query string.
    const extractStateToken = (qs) => qs.match(/(?<=\bstate=)([^&]*)/)[0];
    // Set the token value.
    const state = extractStateToken(search);

    // Drop focus on the inputs.
    const focused = document.activeElement;
    focused.blur();

    submitUpdateEmail({
      type: 'reset',
      credentials: {
        password: event.value,
        state,
      },
    });
  };

  return (
    <div className={styles.accountWrap}>
      <p className={styles.accountSubHeader}>
        {/* eslint-disable-next-line quotes */}
        {__(`Okay, let's update your email by entering your password.`,
          'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Enter your password', 'mittr')}
      </p>
      <form
        onSubmit={onSubmit}
        className={styles.formWrap}
      >
        <label
          className="zephr-input-checkbox-wrapper"
          htmlFor="updateEmailPassword"
        >
          <input
            id="updateEmailPassword"
            name="updateEmailPassword"
            type="password"
            placeholder="Enter password"
            required
            aria-errormessage="updateEmailPassword-error"
          />
        </label>
      </form>
    </div>
  );
};

UpdateEmail.propTypes = {
  submitUpdateEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitUpdateEmail: (data) => dispatch(actionReceiveUpdateEmail(data)),
});

export default mapDispatchToProps(withStyles(styles)(UpdateEmail));
