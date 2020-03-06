/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { withStyles } from 'critical-style-loader/lib';
// eslint-disable-next-line no-unused-vars
import { __ } from '@wordpress/i18n';

import styles from './contactForm.css';

const ContactForm = ({ title }) => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="contactForm__wrap">
      <header className="contactForm__header">
        <h3 className="contactForm__title">{title}</h3>
        <h2 className="contactForm__header">
          {__('Contact Us', 'mittr-plugin-extension')}
        </h2>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contactForm__formGroup">
          <label
            htmlFor="fullName"
            className="contactForm__inputLabel"
          >
            <input
              type="text"
              name="fullName"
              ref={register}
              className="contactForm__input"
              id="fullName"
              placeholder={__(
                'Full name',
                'mittr-plugin-extension'
              )}
            />
          </label>
        </div>
        <div className="contactForm__formGroup">
          <label
            htmlFor="contactUsEmail"
            className="contactForm__inputLabel"
          >
            <input
              type="email"
              name="contactName"
              ref={register}
              className="contactForm__input"
              id="contactUsEmail"
              placeholder={__(
                'Email address',
                'mittr-plugin-extension'
              )}
            />
          </label>
        </div>
        <div className="contactForm__radioWrap">
          <span
            className="contactForm__radioHeader"
            id="areYouASubscriberLable"
          >
            {__(
              'Are you a subscriber to MIT Technology Review?',
              'mittr-plugin-extension'
            )}
          </span>
          <div
            className="contactForm__formGroupRadio"
            role="radiogroup"
            aria-labelledby="areYouASubscriberLable"
          >
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioYesSubscriber"
            >
              <input
                className="contactForm__radioInput"
                ref={register}
                name="subscriberRadio"
                type="radio"
                id="radioYesSubscriber"
              />
              {__('Yes', 'mittr-plugin-extension')}
            </label>
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioNoSubscriber"
            >
              <input
                className="contactForm__radioInput"
                ref={register}
                name="subscriberRadio"
                type="radio"
                id="radioNoSubscriber"
              />
              {__('No', 'mittr-plugin-extension')}
            </label>
          </div>
        </div>
        <div className="contactForm__radioWrap">
          <span
            className="contactForm__radioHeader"
            id="areYouAlum"
          >
            {__(
              'Are you an MIT alum?',
              'mittr-plugin-extension'
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
                ref={register}
                name="alumRadio"
                type="radio"
                id="radioYesAlum"
              />
              {__('Yes', 'mittr-plugin-extension')}
            </label>
            <label
              className="contactForm__inlineRadioLabel"
              htmlFor="radioNoAlum"
            >
              <input
                className="contactForm__radioInput"
                ref={register}
                name="alumRadio"
                type="radio"
                id="radioNoAlum"
              />
              {__('No', 'mittr-plugin-extension')}
            </label>
          </div>
        </div>
        <div className="contactForm__formGroup">
          <label
            className="contactForm__selectLabel"
            htmlFor="questionSelect"
          >
            <select
              ref={register}
              id="questionSelect"
              name="contactUsSelect"
              className="contactForm__select"
            >
              <option>
                {__('Question about my subscription or magazine delivery',
                  'mittr-plugin-extension')}
              </option>
              <option>
                {__('Question about my account or using the website',
                  'mittr-plugin-extension')}
              </option>
              <option>
                {__('Comment or piece of editorial feedback to share',
                  'miir-plugin-extenstion')}
              </option>
              <option>
                {__('Question about an upcoming or past event',
                  'miir-plugin-extenstion')}
              </option>
              <option>
                {__(`Permissions, reprints, syndication,
                  or licensing request`, 'miir-plugin-extenstion')}
              </option>
              <option>
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
          value={__('Get in touch', 'mittr-plugin-extension')}
        />
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
