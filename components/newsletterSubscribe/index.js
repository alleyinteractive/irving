import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import styles from './newsletterSubscribe.css';

const NewsletterSubscribe = ({
  newsCampaignPostID,
  clientId,
  mailchimpId,
  title,
  description,
  color,
  imgLogoUrl,
}) => {
  // Set state variable userEmailInput which we use for the form input value.
  const [userEmailInput, setUserEmailInput] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEmailValid && '' !== userEmailInput) {
      // This is not the action we really want to take on submit sign on, it is
      // only here to demo the functionality of the email service.
      // submitLogin(userEmailInput);
    } else {
      // Email must be invalid it is empty.
      setIsEmailValid(false);
    }
  };

  const validateEmail = (email) => {
    const validEmailTest = /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/.test(email);
    setIsEmailValid(validEmailTest);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUserEmailInput(value);
    validateEmail(value);
  };

  return (
    <aside className={styles.wrap}>
      <form onSubmit={handleSubmit}>
        <div className={styles.subscribeHeader}>
          {imgLogoUrl && (
            <img
              src={imgLogoUrl}
              alt=""
              className={styles.logoImg}
            />
          )}
          {title && (
            <div>
              <h3 className={styles.signUpHeading}>
                {__('Sign up for', 'mittr')}
                &nbsp;
                <span className={styles.bold}>{title}</span>
              </h3>
              &nbsp;
              <span>{`- ${description}`}</span>
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor={`emailInput-${clientId}`}
            className={styles.emailInputLabel}
          >
            <input
              type="text"
              className={styles.emailInput}
              id={`emailInput-${clientId}`}
              placeholder={
                __('Enter your email, receive the newsletter', 'mittr')
              }
              style={{
                borderColor: color || '#000',
              }}
              value={userEmailInput}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="button"
            id={`signUpBtn-${clientId}`}
            className={styles.signUpBtn}
            style={{
              backgroundColor: color || '#000',
              borderColor: color || '#000',
            }}
          >
            {__('Sign up', 'mittr')}
          </button>
        </div>
        <div className={styles.radioWrap}>
          <h3
            className={styles.radioHeader}
            id={`upToDateOptInID-${clientId}`}
          >
            {__(`Also stay updated on MIT Technology
              Review initiatives and events?`, 'mittr')}
          </h3>
          <div
            className={styles.formGroupRadio}
            role="radiogroup"
            aria-labelledby={`upToDateOptInID-${clientId}`}
          >
            <label
              className={styles.inlineRadioLabel}
              htmlFor={`radioYesID-${clientId}`}
            >
              {__('Yes', 'mittr')}
              <input
                className={styles.radioInput}
                name="opt-in-radio"
                type="radio"
                id={`radioYesID-${clientId}`}
                checked
                value="yes"
              />
            </label>
            <label
              className={styles.inlineRadioLabel}
              htmlFor={`radioNoID-${clientId}`}
            >
              {__('No', 'mittr')}
              <input
                className={styles.radioInput}
                name="opt-in-radio"
                type="radio"
                id={`radioNoID-${clientId}`}
                value="no"
              />
            </label>
          </div>
        </div>
      </form>
    </aside>
  );
};

NewsletterSubscribe.propTypes = {
  clientId: PropTypes.string.isRequired,
  mailchimpId: PropTypes.string.isRequired,
  newsCampaignPostID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  imgLogoUrl: PropTypes.string.isRequired,
};

export default withStyles(styles)(NewsletterSubscribe);
