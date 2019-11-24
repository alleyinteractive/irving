import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import jsonp from 'jsonp';
import queryString from 'query-string';
import { withStyles } from 'critical-style-loader/lib';
import styles from './newsletterSubscribe.css';

const NewsletterSubscribe = ({
  clientId,
  title,
  description,
  color,
  imgLogoUrl,
}) => {
  // Set state variable userEmailInput which we use for the form input value.
  const [userEmailInput, setUserEmailInput] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('Yes');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [formResponseState, setFormResponseState] = useState({
    status: 'pending',
    message: '',
  });

  /**
   * Set the key for the form param depending on which Newsletter group the component is using.
   */
  const setNewsLetterKey = () => {
    switch (title) {
      case 'The Download':
        return 'group[12385][4]';
      case 'The Algorithm':
        return 'group[12385][8]';
      case 'Chain Letter':
        return 'group[12385][16]';
      case 'fwd: Economy':
        return 'group[12385][32]';
      case 'The Airlock':
        return 'group[12385][64]';
      case 'Weekend Reads':
        return 'group[12385][128]';
      default:
        return '';
    }
  };

  const postFormData = (url) => {
    jsonp(
      url,
      // Need to add a blank param 'c' so we don't get redirected.
      {
        param: 'c',
      },
      (err, data) => {
        if (err) {
          setFormResponseState({
            status: 'error',
            message: err,
          });
        } else if ('success' !== data.result) {
          setFormResponseState({
            status: 'error',
            message: data.msg,
          });
        } else {
          setFormResponseState({
            status: 'success',
            message: data.msg,
          });
        }
      },
    );
  };

  /**
   * Subscribe user to newsletter group from mailchimp
   * @param {string} email
   * @param {string} subscribeToEvents radio input value
   */
  const submitNewsLetterSubscribe = (email, subscribeToEvents) => {
    // Set the params. Merge fields found in MailChimp account.
    const data = {
      MERGE0: email,
      // Merge values for Initiates, Events, Updates (mirrors current functionality)
      MERGE27: subscribeToEvents,
      MERGE28: subscribeToEvents,
      MERGE29: subscribeToEvents,
      // Dynamically set key based on Newsletter Group
      [setNewsLetterKey()]: 1,
    };
    const formUrl =
      'https://technologyreview.us11.list-manage.com/subscribe/post-json?u=47c1a9cec9749a8f8cbc83e78&id=e2349bbf6b';
    const params = queryString.stringify(data);
    const url = `${formUrl}&${params}`;
    postFormData(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEmailValid && '' !== userEmailInput) {
      // This is not the action we really want to take on submit sign on, it is
      // only here to demo the functionality of the email service.
      submitNewsLetterSubscribe(userEmailInput, selectedRadio);
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

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedRadio(value);
  };

  return (
    <aside className="newsletter__wrap">
      <form onSubmit={handleSubmit}>
        <div className="newsletter__subscribeHeader">
          {imgLogoUrl && (
            <img src={imgLogoUrl} alt="" className="newsletter__logoImg" />
          )}
          {title && (
            <div>
              <h3 className="newsletter__signUpHeading">
                {__('Sign up for', 'mittr')}
                &nbsp;
                <span className="bold">{title}</span>
              </h3>
              &nbsp;
              <span>{`- ${description}`}</span>
            </div>
          )}
        </div>
        <div className="newsletter__formGroup">
          <label
            htmlFor={`emailInput-${clientId}`}
            className="newsletter__emailInputLabel"
          >
            <input
              type="text"
              className="newsletter__emailInput"
              id={`emailInput-${clientId}`}
              placeholder={__(
                'Enter your email, receive the newsletter',
                'mittr',
              )}
              style={{
                borderColor: color || '#000',
              }}
              value={userEmailInput}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="submit"
            id={`signUpBtn-${clientId}`}
            className="newsletter__signUpBtn"
            style={{
              backgroundColor: color || '#000',
              borderColor: color || '#000',
            }}
          >
            {__('Sign up', 'mittr')}
          </button>
        </div>
        {! isEmailValid && (
          <span
            className="newsletter__formError"
            aria-live="assertive"
            id="email-error"
          >
            {__(
              `Oops! Let’s try that again —
            please enter your email address.`,
              'mittr',
            )}
          </span>
        )}
        {formResponseState.message && (
          <span
            className={
              'error' === formResponseState.status ?
                'newsletter__formError' :
                'newsletter__formSuccess'
            }
          >
            {formResponseState.message}
          </span>
        )}
        <div className="newsletter__radioWrap">
          <h3
            className="newsletter__radioHeader"
            id={`upToDateOptInID-${clientId}`}
          >
            {__(
              `Also stay updated on MIT Technology
              Review initiatives and events?`,
              'mittr',
            )}
          </h3>
          <div
            className="newsletter__formGroupRadio"
            role="radiogroup"
            aria-labelledby={`upToDateOptInID-${clientId}`}
          >
            <label
              className="newsletter__inlineRadioLabel"
              htmlFor={`radioYesID-${clientId}`}
            >
              <input
                className="newsletter__radioInput"
                name="opt-in-radio"
                type="radio"
                id={`radioYesID-${clientId}`}
                value="Yes"
                checked={'Yes' === selectedRadio}
                onChange={handleRadioChange}
                style={{
                  borderColor: color,
                  backgroundColor: 'Yes' === selectedRadio ? color : '#fff',
                }}
              />
              {__('Yes', 'mittr')}
            </label>
            <label
              className="newsletter__inlineRadioLabel"
              htmlFor={`radioNoID-${clientId}`}
            >
              <input
                className="newsletter__radioInput"
                name="opt-in-radio"
                type="radio"
                id={`radioNoID-${clientId}`}
                value="No"
                checked={'No' === selectedRadio}
                onChange={handleRadioChange}
                style={{
                  borderColor: color,
                  backgroundColor: 'No' === selectedRadio ? color : '#fff',
                }}
              />
              {__('No', 'mittr')}
            </label>
          </div>
        </div>
      </form>
    </aside>
  );
};

NewsletterSubscribe.propTypes = {
  clientId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  imgLogoUrl: PropTypes.string.isRequired,
};

export default withStyles(styles)(NewsletterSubscribe);
