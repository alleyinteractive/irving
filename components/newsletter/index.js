import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import parse from 'html-react-parser';
import jsonp from 'jsonp';
import classNames from 'classnames';
import queryString from 'query-string';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';

// Styles.
import styles from './newsletter.css';
import storygroup from './newsletter--storygroup.css';
import sidebar from './newsletter--sidebar.css';

const NewsletterSubscribe = ({
  clientId,
  mailchimpId,
  title,
  description,
  color,
  imgLogoUrl,
  theme,
  themeName,
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
   * Function to post to the form so the user is subscribed.
   * @param {string} url string for the form.
   */
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
   * Subscribe user to newsletter group from mailchimp.
   * @param {string} email
   * @param {string} subscribeToEvents radio input value
   */
  const submitNewsLetterSubscribe = (email, subscribeToEvents) => {
    // Set the params. Merge fields found in MailChimp account.
    const data = {
      u: '47c1a9cec9749a8f8cbc83e78',
      id: 'e2349bbf6b',
      MERGE0: email,
      // Merge values for Initiates, Events, Updates (mirrors current functionality)
      MERGE27: subscribeToEvents,
      MERGE28: subscribeToEvents,
      MERGE29: subscribeToEvents,
      [mailchimpId]: 1,
    };
    const formUrl =
      'https://technologyreview.us11.list-manage.com/subscribe/post-json?';
    const params = queryString.stringify(data);
    const url = `${formUrl}${params}`;
    postFormData(url);
  };

  /**
   * Handle form submission.
   * @param {DomEvent} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEmailValid && '' !== userEmailInput) {
      submitNewsLetterSubscribe(userEmailInput, selectedRadio);
    } else {
      // Email must be invalid it is empty.
      setIsEmailValid(false);
    }
  };

  /**
   * Validate email format.
   * @param {string} email email string.
   */
  const validateEmail = (email) => {
    const validEmailTest = /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/.test(email);
    setIsEmailValid(validEmailTest);
  };

  /**
   * As user input changes check if the email is a valid format.
   * @param {DomEvent} event
   */
  const handleInputChange = ({ target: { value } }) => {
    setUserEmailInput(value);
    validateEmail(value);
  };

  return (
    <>
      <aside
        className={classNames('newsletter__wrap', theme.wrapper)}
        style={{ borderColor: color }}
      >
        <form onSubmit={handleSubmit}>
          <header className="newsletter__subscribeHeader">
            {imgLogoUrl && (
              <img src={imgLogoUrl} alt="" className="newsletter__logoImg" />
            )}
            {(title && 'sidebar' !== themeName) && (
              <div>
                <h2 className="newsletter__signUpHeading">
                  {__('Sign up for', 'mittr')}
                  &nbsp;
                  <span className="newsletter__bold">{title}</span>
                </h2>
                &nbsp;
                <span>{`- ${description}`}</span>
              </div>
            )}
            {(title && 'sidebar' === themeName) && (
              <div>
                <h2
                  className={
                    classNames('newsletter__signUpHeading', theme.signUpHeading)
                  }
                  style={{ color }}
                >
                  {title}
                </h2>
                <p style={{ color }}>{description}</p>
              </div>
            )}
          </header>
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
              aria-live="assertive"
              className={
                'error' === formResponseState.status ?
                  'newsletter__formError' :
                  'newsletter__formSuccess'
              }
            >
              {parse(formResponseState.message)}
            </span>
          )}
          <div className={classNames('newsletter__radioWrap', theme.radioWrap)}>
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
                  onChange={({ target: { value } }) => setSelectedRadio(value)}
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
                  onChange={({ target: { value } }) => setSelectedRadio(value)}
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
      <div className={theme.moreLink}>
        {'sidebar' === themeName && (
          <a href="https://forms.technologyreview.com/newsletters/" name="More Newsletter link">
            {__('More newsletters', 'mittr')} &#62;
          </a>
        )}
      </div>
    </>
  );
};

NewsletterSubscribe.defaultProps = {
  clientId: '',
  mailchimpId: '',
  themeName: '',
};

NewsletterSubscribe.propTypes = {
  clientId: PropTypes.string,
  mailchimpId: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  imgLogoUrl: PropTypes.string.isRequired,
  themeName: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

export default withThemes('newsletter', {
  default: styles,
  storygroup,
  sidebar,
})(withStyles(styles, storygroup, sidebar)(NewsletterSubscribe));
