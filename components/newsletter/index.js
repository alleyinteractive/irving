import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
// Styles.
import styles from './newsletter.css';
import storygroup from './newsletter--storygroup.css';
import sidebar from './newsletter--sidebar.css';

const NewsletterSubscribe = ({
  apiEndPoint,
  clientId,
  mailchimpListName,
  title,
  description,
  color,
  imgLogoUrl,
  location, // location prop is used for GA event
  theme,
  themeName,
}) => {
  // Match the mailchimp list name set in the api. Changing the title in the WP Admin will break this.
  // Set state variable userEmailInput which we use for the form input value.
  const [userEmailInput, setUserEmailInput] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [formResponseState, setFormResponseState] = useState({
    submitted: 'false',
    status: 'error',
    message: '',
  });

  /**
   * Subscribe user to newsletter group from mailchimp.
   * @param {string} email
   * @param {string} subscribeToEvents radio input value
   */
  const submitNewsLetterSubscribe = async (email, subscribeToEvents) => {
    // If the mailchimpListName isn't set in the API, attempt to match it through the title.
    const data = {
      newsletter: '' !== mailchimpListName ?
        mailchimpListName :
        title.toLowerCase().replace(' ', '_'),
      emailAddress: email,
      merge_fields: {
        INITIATIVE: subscribeToEvents,
        PARTNERS: subscribeToEvents,
        EVENTS: subscribeToEvents,
      },
    };
    const request = fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await request;

    // Error.
    if (200 !== response.status && 204 !== response.status) {
      let errorMessage = __('There was an error submitting the request.',
        'mittr');
      if (400 === response.status) {
        // Get the error message(s).
        const responseData = await response.json();
        if (responseData && responseData.errors && responseData.errors.length) {
          errorMessage = responseData.errors
            .map((error) => error.message).join(' ');
        } else if (responseData && responseData.message) {
          errorMessage = responseData.message;
        }
      }

      // Error.
      setFormResponseState({
        submitted: true,
        status: 'error',
        message: errorMessage,
      });
      return;
    }

    // Success.
    setFormResponseState({
      submitted: true,
      status: 'success',
      message: __('Thanks for signing up.', 'mittr'),
    });

    window.dataLayer.push({
      event: 'subscribe',
      category: 'newsletter-form',
      action: `${data.newsletter}-sign-up-success`,
      label: location,
      PageViewFired: true,
    });
  };

  /**
   * Handle form submission.
   * @param {DomEvent} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEmailValid && '' !== userEmailInput && '' !== selectedRadio) {
      submitNewsLetterSubscribe(userEmailInput, selectedRadio);
    } else {
      // Email must be invalid if required fields are not filled/present.
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

    // Let's wait 4 seconds.
    setTimeout(() => validateEmail(value), 4000);
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
              <img
                src={imgLogoUrl}
                alt=""
                className="newsletter__logoImg"
              />
            )}
            {(title && 'sidebar' !== themeName) && (
              <div>
                <h2 className="newsletter__signUpHeading">
                  {__('Sign up for', 'mittr')}
                  &nbsp;
                  <span className="newsletter__bold">{title}</span>
                </h2>
                &nbsp;
                <span className="newsletter_description">
                  {`- ${description}`}
                </span>
              </div>
            )}
            {(title && 'sidebar' === themeName) && (
              <div>
                <h2
                  className={
                    classNames('newsletter__signUpHeading',
                      theme.signUpHeading)
                  }
                  style={{ color }}
                >
                  {title}
                </h2>
                <p style={{ color }}>{description}</p>
              </div>
            )}
          </header>
          {formResponseState.message && (
            <span
              aria-live="assertive"
              className="form_message"
            >
              {formResponseState.message}
            </span>
          )}
          {! formResponseState.message && (
            <div>
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
                      'Enter your email, get the newsletter',
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
              <div className={classNames('newsletter__radioWrap',
                theme.radioWrap)}
              >
                <h3
                  className="newsletter__radioHeader"
                  id={`upToDateOptInID-${clientId}`}
                >
                  {__(
                    `Stay updated on MIT Technology
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
                      onChange={({
                        target: { value },
                      }) => setSelectedRadio(value)}
                      style={{
                        borderColor: color,
                        backgroundColor: 'Yes' === selectedRadio ?
                          color : '#fff',
                      }}
                      required
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
                      onChange={({
                        target: { value },
                      }) => setSelectedRadio(value)}
                      style={{
                        borderColor: color,
                        backgroundColor: 'No' === selectedRadio ?
                          color : '#fff',
                      }}
                    />
                    {__('No', 'mittr')}
                  </label>
                </div>
              </div>
            </div>
          )}
        </form>
      </aside>
      <div className={theme.moreLink}>
        {'sidebar' === themeName && (
          <a
            href="https://forms.technologyreview.com/newsletters/"
          >
            {__('More newsletters', 'mittr')} &#62;
          </a>
        )}
      </div>
    </>
  );
};

NewsletterSubscribe.defaultProps = {
  apiEndPoint: 'https://eventbrite-to-blueconic.herokuapp.com/api/web/newsletters/subscriptions',
  clientId: '',
  mailchimpListName: '',
  location: 'in-body', // default of `in-body` for the gutenblock version
  themeName: '',
  theme: 'default',
};

NewsletterSubscribe.propTypes = {
  apiEndPoint: PropTypes.string,
  clientId: PropTypes.string,
  mailchimpListName: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  imgLogoUrl: PropTypes.string.isRequired,
  location: PropTypes.string,
  themeName: PropTypes.string,
  theme: PropTypes.object,
};

export default withThemes('newsletter', {
  default: styles,
  storygroup,
  sidebar,
})(withStyles(styles, storygroup, sidebar)(NewsletterSubscribe));
