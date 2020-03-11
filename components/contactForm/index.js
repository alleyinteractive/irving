/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import submitForm from 'services/submitForm';
import LazyRecaptcha from '../accounts/register/recaptcha';

import styles from './contactForm.css';

const ContactForm = ({ title }) => {
  const {
    errors,
    register,
    handleSubmit,
    formState,
    watch,
  } = useForm();
  const REQUIRED_FORM_MESSAGE = __('Oops! Don’t forget to fill this field out.',
    'mittr');
  const [formStatus, setFormStatus] = useState({
    status: 'unsubmitted',
    message: '',
  });
  const [captcha, setCaptcha] = useState({
    isValid: false,
    hasError: false,
  });
  const showDelivery = 'subscription' === watch('mailbox_slug');
  const onSubmit = (formData) => {
    if (! captcha.isValid) {
      setFormStatus({
        status: 'error',
        message: __('Please confirm you\'re not a robot.', 'mittr'),
      });
    }
    if (formState.isValid && captcha.isValid) {
      // Clear form message.
      setFormStatus({
        status: 'submitted',
        message: '',
      });
      // Split the full_name value for submission to HelpScout.
      const names = formData.full_name.split(' ');
      // eslint-disable-next-line no-param-reassign, prefer-destructuring
      formData.first_name = names[0];
      // eslint-disable-next-line no-param-reassign, prefer-destructuring
      formData.last_name = names[names.length - 1];
      // Must set message data or else HelpScout API will fail the reqeust.
      // eslint-disable-next-line no-param-reassign
      formData.message = {
        subject: 'Message from technologyreview.com contact us form',
        body: formData.message_body ||
          'This is a request sent from the contact us form.',
      };
      submitForm('helpscout', formData)
        .then(({ status, message }) => {
          setFormStatus({
            status,
            message,
          });
        })
        .catch((err) => {
          console.log({ err });
          setFormStatus({
            status: 'error',
            message: __('Sorry, your request did not go through.', 'mittr'),
          });
        });
    }
  };

  return (
    <div className="contactForm__wrap">
      <header className="contactForm__header-wrap">
        <h3 className="contactForm__title">{title}</h3>
        <h2 className="contactForm__header">
          {__('Contact Us', 'mittr')}
        </h2>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contactForm__formGroup">
          <label
            htmlFor="full_name"
            className="contactForm__inputLabel"
          >
            <input
              type="text"
              name="full_name"
              ref={register({
                required: true,
                pattern: /^[a-z ,.'-]+$/i,
              })}
              aria-invalid={errors.full_name ? 'true' : 'false'}
              // eslint-disable-next-line max-len
              aria-describedby="error-full_name-required error-full_name-pattern"
              className={classNames('contactForm__input', {
                [styles.inputError]: errors.full_name,
              })}
              id="full_name"
              placeholder={__(
                'Full name',
                'mittr'
              )}
            />
          </label>
          <span
            role="alert"
            id="error-full_name-required"
            className={styles.errorMessage}
            style={{
              display: errors.full_name &&
              'required' === errors.full_name.type ?
                'block' : 'none',
            }}
          >
            {REQUIRED_FORM_MESSAGE}
          </span>
          <span
            role="alert"
            id="error-full_name-pattern"
            className={styles.errorMessage}
            style={{
              display: errors.full_name && 'pattern' === errors.full_name.type ?
                'block' : 'none',
            }}
          >
            {__('Field must only contain letters', 'mittr')}
          </span>
        </div>
        <div className="contactForm__formGroup">
          <label
            htmlFor="contactUsEmail"
            className="contactForm__inputLabel"
          >
            <input
              type="email"
              name="email"
              ref={register({
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              })}
              className={classNames('contactForm__input', {
                [styles.inputError]: errors.email,
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
              // eslint-disable-next-line max-len
              aria-describedby="error-email-required error-email-pattern"
              id="contactUsEmail"
              placeholder={__(
                'Email address',
                'mittr'
              )}
            />
          </label>
          <span
            role="alert"
            id="error-email-required"
            className={styles.errorMessage}
            style={{
              display: errors.email &&
              'required' === errors.email.type ?
                'block' : 'none',
            }}
          >
            {REQUIRED_FORM_MESSAGE}
          </span>
          <span
            role="alert"
            id="error-email-pattern"
            className={styles.errorMessage}
            style={{
              display: errors.email &&
                'pattern' === errors.email.type ?
                'block' : 'none',
            }}
          >
            {__('Invalid email format', 'mittr')}
          </span>
        </div>
        <div className="contactForm__radioWrap">
          <span
            className="contactForm__radioHeader"
            id="areYouASubscriberLabel"
          >
            {__(
              'Are you a subscriber to MIT Technology Review?',
              'mittr'
            )}
          </span>
          <div
            className="contactForm__formGroupRadio"
            role="radiogroup"
            aria-labelledby="areYouASubscriberLabel"
          >
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioYesSubscriber"
            >
              <input
                className="contactForm__radioInput"
                ref={register({
                  required: true,
                })}
                aria-invalid={errors.subscriber ? 'true' : 'false'}
                // eslint-disable-next-line max-len
                aria-describedby="error-subscriber-required"
                defaultValue="yes"
                name="subscriber"
                type="radio"
                id="radioYesSubscriber"
              />
              {__('Yes', 'mittr')}
            </label>
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioNoSubscriber"
            >
              <input
                className="contactForm__radioInput"
                ref={register({
                  required: true,
                })}
                defaultValue="no"
                name="subscriber"
                type="radio"
                id="radioNoSubscriber"
              />
              {__('No', 'mittr')}
            </label>
          </div>
        </div>
        <span
          role="alert"
          id="error-subscriber-required"
          className={styles.errorMessage}
          style={{
            display: errors.subscriber &&
              'required' === errors.subscriber.type ?
              'block' : 'none',
          }}
        >
          {REQUIRED_FORM_MESSAGE}
        </span>
        <div className="contactForm__radioWrap">
          <span
            className="contactForm__radioHeader"
            id="areYouAlum"
          >
            {__(
              'Are you an MIT alum?',
              'mittr'
            )}
          </span>
          <div
            className="contactForm__formGroupRadio"
            role="radiogroup"
            aria-labelledby="areYouAlum"
          >
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioYesAlum"
            >
              <input
                className="contactForm__radioInput"
                ref={register({
                  required: true,
                })}
                defaultValue="yes"
                aria-invalid={errors.mit_alum ? 'true' : 'false'}
                // eslint-disable-next-line max-len
                aria-describedby="error-mit_alum-required"
                name="mit_alum"
                type="radio"
                id="radioYesAlum"
              />
              {__('Yes', 'mittr')}
            </label>
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioNoAlum"
            >
              <input
                className="contactForm__radioInput"
                ref={register({
                  required: true,
                })}
                defaultValue="no"
                name="mit_alum"
                type="radio"
                id="radioNoAlum"
              />
              {__('No', 'mittr')}
            </label>
          </div>
        </div>
        <span
          role="alert"
          id="error-mit_alum-required"
          className={styles.errorMessage}
          style={{
            display: errors.mit_alum &&
              'required' === errors.mit_alum.type ?
              'block' : 'none',
          }}
        >
          {REQUIRED_FORM_MESSAGE}
        </span>
        <div className="contactForm__formGroup">
          <label
            className="contactForm__selectLabel"
            htmlFor="questionSelect"
          >
            <select
              ref={register({
                required: true,
              })}
              id="questionSelect"
              name="mailbox_slug"
              className={classNames('contactForm__select', {
                [styles.inputError]: errors.mailbox_slug,
              })}
            >
              <option defaultValue="">
                {__('Choose a support topic',
                  'mittr')}
              </option>
              <option value="subscription">
                {__('Question about my subscription or magazine delivery',
                  'mittr')}
              </option>
              <option value="website">
                {__('Question about my account or using the website',
                  'mittr')}
              </option>
              <option value="feedback">
                {__('Comment or piece of editorial feedback to share',
                  'mittr')}
              </option>
              <option value="events">
                {__('Question about an upcoming or past event',
                  'mittr')}
              </option>
              <option value="permission">
                {__(`Permissions, reprints, syndication,
                  or licensing request`, 'mittr')}
              </option>
              <option value="general">
                {__('General question or feedback',
                  'mittr')}
              </option>
            </select>
          </label>
          <span
            role="alert"
            id="error-mailbox_slug-required"
            className={styles.errorMessage}
            style={{
              display: errors.mailbox_slug &&
                'required' === errors.mailbox_slug.type ?
                'block' : 'none',
            }}
          >
            {REQUIRED_FORM_MESSAGE}
          </span>
        </div>
        {showDelivery && (
          <div className="contactForm__formGroup">
            <label
              htmlFor="delivery_address"
              className="contactForm__inputLabel"
            >
              <input
                type="text"
                name="delivery_address"
                ref={register({
                  required: true,
                })}
                aria-invalid={errors.delivery_address ? 'true' : 'false'}
                // eslint-disable-next-line max-len
                aria-describedby="error-delivery_address-required"
                className={classNames('contactForm__input', {
                  [styles.inputError]: errors.delivery_address,
                })}
                id="delivery_address"
                placeholder={__(
                  'Delivery address',
                  'mittr'
                )}
              />
            </label>
            <span
              role="alert"
              id="error-delivery_address-required"
              className={styles.errorMessage}
              style={{
                display: errors.delivery_address &&
                'required' === errors.full_name.type ?
                  'block' : 'none',
              }}
            >
              {REQUIRED_FORM_MESSAGE}
            </span>
          </div>
        )}
        <div className="contactForm__formGroup">
          <label
            htmlFor="messageBody"
            className="contactForm__inputLabel"
          >
            <textarea
              className={classNames('contactForm__textarea', {
                [styles.inputError]: errors.message_body,
              })}
              name="message_body"
              ref={register({
                required: true,
              })}
              aria-invalid={errors.message_body ? 'true' : 'false'}
              // eslint-disable-next-line max-len
              aria-describedby="error-message_body-required"
              id="messageBody"
              placeholder={__(
                'How can we help?',
                'mittr'
              )}
              cols="30"
              rows="10"
            />
          </label>
          <span
            role="alert"
            id="error-message_body-required"
            className={styles.errorMessage}
            style={{
              display: errors.message_body &&
                'required' === errors.message_body.type ?
                'block' : 'none',
            }}
          >
            {REQUIRED_FORM_MESSAGE}
          </span>
        </div>
        <LazyRecaptcha
          key="contact-us-captcha"
          id="contact-us-captcha"
          className="captcha"
          sitekey="6Le-58UUAAAAANFChf85WTJ8PoZhjxIvkRyWczRt"
          verifyCallback={() => {
            setCaptcha({
              isValid: true,
              hasError: false,
            });
          }}
          ariaErrormessage="captcha-error"
        />
        <input
          type="submit"
          id="getInTouchBtn"
          className="contactForm__submitBtn"
          value={'submitted' === formStatus.status ?
            __('Sending...', 'mittr') : __('Get in touch', 'mittr')}
        />
        {'' !== formStatus.message && (
          <div className={classNames(styles.formResponse, {
            [styles.successResponse]: 'success' === formStatus.status,
            [styles.errorResponse]: 'error' === formStatus.status,
          })}
          >
            {formStatus.message}
          </div>
        )}
        {true === captcha.hasError && (
          <span
            className={styles.formError}
            aria-live="assertive"
            id="captcha-error"
          >
            {__(
              `Oops! Let's try that again -
               Please complete the captcha
               in order to send your message.`,
              'mittr'
            )}
          </span>
        )}
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  title: PropTypes.string,
};

ContactForm.defaultProps = {
  title: '',
};

export default (withStyles(styles)(ContactForm));
