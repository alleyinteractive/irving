/* eslint-disable */
import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import {
  getIsLoading,
  getForms,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
  actionReceiveInvalidPassword,
} from 'actions/zephrActions';

// Styles
import styles from './register.css';

const Register = ({
  isLoading,
  forms,
  submitRegistration,
  displayInvalidPasswordError
}) => {
  const registrationForm = forms.filter((form) => '/register' === form.route)[0];
  // const [captcha, setCaptcha] = useState({
  //   isValid: false,
  //   hasError: false,
  // });

  const handleSubmit = (event) => {
    event.preventDefault();

    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email-address');
    const password = document.getElementById('new-password');
    const verifyPassword = document.getElementById('verify-password');

    // Drop focus on the active form element.
    const focused = document.activeElement;
    focused.blur();

    if (password.value !== verifyPassword.value) {
      displayInvalidPasswordError();
    } else {
      const names = fullName.value.split(' ');

      submitRegistration({
        type: 'registration',
        credentials: {
          email: email.value,
          password: password.value,
          attributes: {
            fullName: fullName.value,
            firstName: names[0],
            lastName: names[names.length - 1],
          },
        },
      });
    }
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Thanks! Just one more step.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Complete your account information below.', 'mittr')}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        {! isLoading && registrationForm ? (
          registrationForm.components
        ) : null}
        <h2 className={styles.confirmationText}>
          {__(
            "We'll email you a password confirmation link. Happy reading!", // eslint-disable-line quotes
            'mittr'
          )}
        </h2>
      </form>
    </div>
  );
};

Register.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forms: PropTypes.array.isRequired,
  submitRegistration: PropTypes.func.isRequired,
  displayInvalidPasswordError: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitRegistration: (registrationData) =>
    dispatch(actionSubmitForm(registrationData)),
  displayInvalidPasswordError: () =>
    dispatch(actionReceiveInvalidPassword()),
});
const withRedux = connect(
  (state) => ({
    isLoading: getIsLoading(state),
    forms: getForms(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Register)
);
