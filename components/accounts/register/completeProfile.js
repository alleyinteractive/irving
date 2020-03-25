import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import {
  actionSubmitProfile,
} from 'actions/zephrActions';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';

// Styles
import styles from './register.css';

const CompleteProfile = ({
  submitProfile,
}) => {
  const [fullNameValid, invalidateForm] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Drop focus on the active form element.
    const focused = document.activeElement;
    focused.blur();

    const name = document.getElementById('full-name');

    if (! name.value.match(/^[a-z ,.'-]+$/i)) {
      invalidateForm(false);
      // Halt the function's execution.
      return;
    }

    // Split the name value for submission to Zephr.
    const names = name.value.split(' ');

    submitProfile({
      fullName: name.value,
      firstName: names[0],
      lastName: 1 < names.length ? names[names.length - 1] : '',
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.subheader}>
        {__('Thank you!', 'mittr')}
      </p>
      <p className={styles.headerDescription}>
        {__(
          `Your online account is almost complete!
            Please complete your profile below.`,
          'mittr'
        )}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <input
          type="text"
          id="full-name"
          defaultValue=""
          placeholder="Enter your full name"
          aria-invalid={false === fullNameValid}
          aria-required
        />
        {false === fullNameValid && (
          <span role="alert" id="full-name-alert">
            {__(
              `Opps! Let's try that again —
               Please enter your full name.`,
              'mittr'
            )}
          </span>
        )}
        <input
          type="submit"
          value="Complete your profile"
        />
      </form>
    </div>
  );
};

CompleteProfile.propTypes = {
  submitProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitProfile: (profile) => dispatch(actionSubmitProfile(profile)),
});

const withRedux = connect(
  () => {},
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(CompleteProfile)
);
