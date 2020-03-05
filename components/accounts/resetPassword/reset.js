import React, { useState, useEffect } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import URL from 'url-parse';
import {
  getResetForm,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
  actionReceiveInvalidPassword,
} from 'actions/zephrActions';
import DataLoading from 'components/hoc/withData/loading';
import toFormElements from 'sagas/zephrSaga/forms/toFormElements';

// Styles
import styles from './reset.css';

const ResetForm = ({
  resetForm,
  submitReset,
  displayInvalidPasswordError,
}) => {
  const [components, setForm] = useState([]);

  // Create submit handler.
  const onSubmit = (event) => {
    event.preventDefault();

    // Extract the token from the query string.
    const extractStateToken = () => {
      const urlObj = new URL(window.location.href, true);
      const { query: { state = '' } = {} } = urlObj || {};
      return state;
    };
    // Set the token value.
    const state = extractStateToken();

    const password = document.getElementById('new-password');
    const verifyPassword = document.getElementById('verify-password');

    // Drop focus on the inputs.
    const focused = document.activeElement;
    focused.blur();

    // Check to ensure that the password and it's verification value match prior to submission.
    if (password.value !== verifyPassword.value) {
      // Invalid passwords get their own dispatch action because multiple inputs need to be invalidated.
      displayInvalidPasswordError('reset');

      // Exit the submit process.
      return;
    }

    submitReset({
      type: 'reset',
      credentials: {
        password: password.value,
        state,
      },
    });
  };

  useEffect(() => {
    if (0 !== Object.keys(resetForm).length) {
      const fields = toFormElements(resetForm.components);
      // Update the form state.
      setForm(fields);
    }
  }, [resetForm]);

  // If the form has not yet been retrieved, show a loader.
  if (0 === Object.keys(resetForm).length) {
    return (
      <div className={styles.accountWrap}>
        <DataLoading />
      </div>
    );
  }

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {/* eslint-disable-next-line quotes */}
        {__(`Okay, let's reset your password`, 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Enter your new password', 'mittr')}
      </p>
      <form
        onSubmit={onSubmit}
        className={styles.formWrap}
      >
        {components}
      </form>
    </div>
  );
};

ResetForm.defaultProps = {
  resetForm: {},
};

ResetForm.propTypes = {
  resetForm: PropTypes.object,
  submitReset: PropTypes.func.isRequired,
  displayInvalidPasswordError: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitReset: (data) => dispatch(actionSubmitForm(data)),
  displayInvalidPasswordError: (type) => dispatch(actionReceiveInvalidPassword(type)), // eslint-disable-line max-len
});

const withRedux = connect(
  (state) => ({
    resetForm: getResetForm(state),
  }),
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(ResetForm));
