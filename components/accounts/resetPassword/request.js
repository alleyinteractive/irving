import React, { useState, useEffect } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getResetRequestForm,
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
} from 'actions/zephrActions';
import history from 'utils/history';
import DataLoading from 'components/hoc/withData/loading';
import toFormElements from 'sagas/zephrSaga/forms/toFormElements';
import Link from 'components/helpers/link';

// Styles
import styles from './reset.css';

const RequestForm = ({
  requestForm,
  submitResetRequest,
  isAuthenticated,
}) => {
  // Prevent authenticated users from being able to visit this route.
  if (isAuthenticated) {
    history.push('/');
  }

  const [components, setForm] = useState([]);

  // Create submit handler.
  const onSubmit = (event) => {
    event.preventDefault();

    const email = document.getElementById('email-address');

    // Drop focus on the inputs.
    const focused = document.activeElement;
    focused.blur();

    submitResetRequest({
      type: 'resetRequest',
      credentials: {
        email: email.value,
      },
    });
  };

  useEffect(() => {
    if (0 !== Object.keys(requestForm).length) {
      const fields = toFormElements(requestForm.components);
      // Update the form state.
      setForm(fields);
    }
  }, [requestForm]);

  // If the form has not yet been retireved, show a loader.
  if (0 === Object.keys(requestForm).length) {
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
        {__(`Okay, let's reset your password.`, 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {/* eslint-disable-next-line quotes */}
        {__(`We'll email you a link right now`, 'mittr')}
      </p>
      <form
        onSubmit={onSubmit}
        className={styles.inlineFormWrap}
      >
        {components}
      </form>
      <div className={styles.helpLinks}>
        <span>Questions? <Link to="/help">Visit our help section</Link>.</span>
        <span>
          Changed your mind?{' '}
          <Link to="/login/">Return to the login screen</Link>.
        </span>
      </div>
    </div>
  );
};

RequestForm.defaultProps = {
  requestForm: {},
};

RequestForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  requestForm: PropTypes.object,
  submitResetRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitResetRequest: (data) => dispatch(actionSubmitForm(data)),
});

const withRedux = connect(
  (state) => ({
    requestForm: getResetRequestForm(state),
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(RequestForm));
