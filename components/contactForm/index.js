/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import submitForm from 'services/submitForm';

import styles from './contactForm.css';

const ContactForm = ({ title }) => {
  const {
    errors,
    register,
    handleSubmit,
    formState,
  } = useForm();
  const [formStatus, setFormStatus] = useState({
    status: 'unsubmitted',
    message: '',
  });
  const onSubmit = (formData) => {
    if (formState.isValid) {
      // Split the full_name value for submission to HelpScout.
      const names = formData.full_name.split(' ');
      // eslint-disable-next-line no-param-reassign, prefer-destructuring
      formData.first_name = names[0];
      // eslint-disable-next-line no-param-reassign, prefer-destructuring
      formData.last_name = names[names.length - 1];
      console.log(formData);
      const response = submitForm('helpscout', formData);
      console.log('response ', response.status);
      if ('success' === response.status) {
        setFormStatus({
          status: response.status,
          message: response.message,
        });
      }
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
              className="contactForm__input"
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
            {__('This field is required', 'mittr')}
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
              className="contactForm__input"
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
            {__('This field is required', 'mittr')}
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
                value="yes"
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
                value="no"
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
          {__('This field is required', 'mittr')}
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
                value="yes"
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
                value="no"
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
          {__('This field is required', 'mittr')}
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
              className="contactForm__select"
            >
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
                  'miir-plugin-extenstion')}
              </option>
              <option value="events">
                {__('Question about an upcoming or past event',
                  'miir-plugin-extenstion')}
              </option>
              <option value="permission">
                {__(`Permissions, reprints, syndication,
                  or licensing request`, 'miir-plugin-extenstion')}
              </option>
              <option value="general">
                {__('General question or feedback',
                  'miir-plugin-extenstion')}
              </option>
            </select>
          </label>
        </div>
        <input
          type="submit"
          id="getInTouchBtn"
          className="contactForm__submitBtn"
          value={__('Get in touch', 'mittr')}
        />
        {formStatus.message && (
          <p>{formStatus.message }</p>
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
